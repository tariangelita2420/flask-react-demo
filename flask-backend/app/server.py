from flask import Flask
from flask_cors import CORS
from flask import request
import os
from dotenv import load_dotenv
import requests
import datetime
import pytz
import sqlite3

# Set up Flask App to receive requests
app = Flask(__name__)

# To allow CORS from our frontend - should probably only allow for a patricular domain...
CORS(app)


# Load the .env file
load_dotenv()
# access API key
APIkey = os.getenv('WEATHER_API_KEY')

def get_db_connection():
    conn = sqlite3.connect('database.db')
    # This gives you name-bases access to columns in your database
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/locations',  methods=['GET'])
def getLocations():
    conn = get_db_connection()
    states = conn.execute('SELECT * FROM states').fetchall()
    countries = conn.execute('SELECT * FROM countries').fetchall()
    # We need to convert the rows that SQL returns to tuples so they can be returned as a JSON object
    states = [tuple(row) for row in states]
    countries = [tuple(row) for row in countries]
    conn.close()
    return {'states' : states, 'countries' : countries}

''' route : to retrieve weather
    endpoint : http://localhost:5000/weather?city=Bloomington&state=IL&country=US
    response : {
    "cloudiness": 0,
    "date": "08 January, 2025",
    "dewpoint": 6.85,
    "feelslike": 12.83,
    "score": 0.9000000000000001,
    "sunrisetime": "07:17",
    "temperature": 21.79,
    "weather": {
        "description": "clear sky",
        "icon": "01d",
        "id": 800,
        "main": "Clear"
    },
    "windspeed": 8.66
    }
'''
@app.route('/weather', methods=['GET'])
def getWeather():
    # base_url variable to store url
    # geocoding API to retrieve coordinates for Weather API
    base_url = "http://api.openweathermap.org/geo/1.0/direct"

    # get request params
    city = request.args.get('city')
    state = request.args.get('state')
    country = request.args.get('country')
    
    # International Forecast - state shouldn't be passed to API call
    if (state == None):
        payload = {'q': f"{city},{country}", 'limit': 3, 'appid' : APIkey}
    else:
        payload = {'q': f"{city},{state},{country}", 'limit': 3, 'appid' : APIkey}

    response = requests.get(base_url, params=payload)
    
    # To return back three days of forecast
    alldata = []
    # json method of response object 
    res = response.json()
    if res:
        lat = res[0]['lat']
        lon = res[0]['lon']
        SUNRISE_SCORE = 0

        # Once we have the coordinates, we can then call the actual Weather API to retrieve forecast data
        base_weather_url = "https://api.openweathermap.org/data/3.0/onecall"
        payload = {'lat': lat, 'lon': lon, 'appid' : APIkey, 'units' : 'imperial', 'exclude' : 'hourly,minutely'}

        response = requests.get(base_weather_url, params=payload)

        # try returning weather_res to see what the OpenWeatherMap API actually returns to you
        weather_res = response.json()

        # forecast for tomorrow, day after and next week
        days = [1, 2, 7]
        for ind in days:
            weather_daily = weather_res['daily'][ind]
            # consolidating the large weather json for fields that only matter for sunrise
            weather_obj = {}
            weather_obj['cloudiness'] = weather_daily['clouds']
            weather_obj['dewpoint'] = round(weather_daily['dew_point'])

            # to ensure that UTC time is being converted to local timezone for sunrise
            local_tz = pytz.timezone(weather_res['timezone'])
            time_local = datetime.datetime.fromtimestamp(weather_daily['sunrise']).astimezone(local_tz)
            weather_obj['sunrisetime'] = time_local.strftime('%I:%M')
            
            weather_obj['date'] = datetime.datetime.fromtimestamp(weather_daily['dt']).strftime('%d %B, %Y') # Converts a UTC Unix timestamp to a string
            weather_obj['windspeed'] = round(weather_daily['wind_speed'])
            weather_obj['temperature'] = round(weather_daily['temp']['morn'])
            weather_obj['feelslike'] = round(weather_daily['feels_like']['morn'])
            weather_obj['weather'] = weather_daily['weather'][0]
            weather_obj['city'] = city

            
            if weather_obj['cloudiness'] < 20:
                SUNRISE_SCORE += 0.4
            elif weather_obj['cloudiness'] < 40:
                SUNRISE_SCORE += 0.2
            elif weather_obj['cloudiness'] < 60:
                SUNRISE_SCORE += 0.1

            if weather_obj['dewpoint'] < 10:
                SUNRISE_SCORE += 0.2
            elif weather_obj['dewpoint'] < 20:
                SUNRISE_SCORE += 0.1

            if weather_obj['windspeed'] < 6:
                SUNRISE_SCORE += 0.2
            elif weather_obj['windspeed'] < 12:
                SUNRISE_SCORE += 0.1
            
            if weather_obj['weather']['id'] == 800:
                SUNRISE_SCORE += 0.2
            elif weather_obj['weather']['id'] == 801:
                SUNRISE_SCORE += 0.1
            
            weather_obj['score'] = SUNRISE_SCORE
            alldata.append(weather_obj)

        return alldata
    else:
        return "API Error"

@app.route('/')
def mainroute():
    return 'main route'