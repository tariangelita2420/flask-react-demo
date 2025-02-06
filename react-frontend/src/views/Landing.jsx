import background from "../assets/sky.png";
import logo from '../assets/logo.png';
import styles from './Landing.module.css'; // Use CSS Modules! because CSS is global by default (not ideal)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {

    // We use useState to hold all variables/hooks that ned to be updated in react
    const [city, setCity] = useState("")
    const [state, setState] = useState("NA")
    const [country, setCountry] = useState("US")
    const [allStates, setAllStates] = useState([])
    const [allCountries, setAllCountries] = useState([])

    // useNavigate is used to navigate between pages
    const navigate = useNavigate();

    // Function to get back weather data from the backend API after user enters state, city, country
    const getWeatherData = async (e) => {
        e.preventDefault()
        // localhost:5000 is where I am running the backend concurrently
        try {
            const response = await fetch(`http://localhost:5000/weather?state=${state}&city=${city}&country=${country}`, {
                method : 'GET'
            })
            if (!response.ok) {
                throw new Error('Error in fetching Data')
            }
            const res = await response.json()
            // move to the next page with the response from the API
            navigate('/sunrise', {state: res});
           
        } catch (err) {
            console.log(err)
        }
    }

    // This functions calls the API that returns all states and countries for dropdown options
    const getLocations = async () => {
        try {
            const response = await fetch(`http://localhost:5000/locations`, {
                method : 'GET'
            })
            if (!response.ok) {
                throw new Error('Error in fetching Data')
            }
            const res = await response.json()
            // Once the response is returned - you should set state so that you can use it
            setAllStates(res.states)
            setAllCountries(res.countries)
           
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect forces a render dependent on the dependency array 
    useEffect( () => {
        getLocations()
    }, []) // Here the dependency array is empty, which means it renders once on load, calls the location API, sets the state to be used as dropdown options

    return (
        // Basic html - if you are new to html/css flexboxes are the most important thing to know and it's used everywhere
        <div className={styles['landing-main']} style={{ backgroundImage: `url(${background})`}}>
            <div className={styles['nav']}>
            <a href="/">
                <img src={logo} height={80}></img>
                </a>
                <h2 className={styles['nav-text']}>sunrise w sarv</h2>
            </div>
            
            <div className={styles['header-div']}>
                <h2 className={styles['heading']}>calculate the quality of a sunrise</h2>
                <form onSubmit={getWeatherData}>
                    <div className={styles['input-container']}>
                        <label>city</label>
                        <input type="text" id="city" name="city" placeholder="Enter your city" required onChange={(e) => setCity(e.target.value)}/>
                    </div>

                    <div className={styles['input-container']}>
                        <label>state (us only) </label>
                        <select id="state" name="state" value={state}  onChange={(e) => setState(e.target.value)}>
                            {allStates.map((option) => {
                                return (
                                    <option key={option} value={option[2]}>
                                    {option[1]}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={styles['input-container']}>
                        <label>country</label>
                        <select id="country" name="country" value={country}  onChange={(e) => setCountry(e.target.value)}>
                            {allCountries.map((option) => {
                                return (
                                    <option key={option} value={option[2]}>
                                    {option[1]}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles['button-container']}>
                        <button type="submit">calculate!</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

