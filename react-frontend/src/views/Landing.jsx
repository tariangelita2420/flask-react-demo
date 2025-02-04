import background from "../assets/sunsetbg.png";
import styles from './Landing.module.css';
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {

    const [city, setCity] = useState("")
    const [state, setState] = useState("NA")
    const [country, setCountry] = useState("")

    const navigate = useNavigate();

    const getWeatherData = async (e) => {
        e.preventDefault()

        console.log(city, state, country)
        try {
            const response = await fetch(`http://localhost:5000/weather?state=${state}&city=${city}&country=${country}`, {
                method : 'GET'
            })
            if (!response.ok) {
                throw new Error('Error in fetching Data')
            }
            const res = await response.json()
            navigate('/sunrise', {state: res});
           
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles['landing-main']} style={{ backgroundImage: `url(${background})`}}>
            <div className={styles['header-div']}>
                <h2 className={styles['heading']}>Calculate Quality of Sunrise!</h2>
                <form onSubmit={getWeatherData}>
                    <div className={styles['input-container']}>
                        <label>City: </label>
                        <input type="text" id="city" name="city" placeholder="Enter your city" required onChange={(e) => setCity(e.target.value)}/>
                    </div>

                    <div className={styles['input-container']}>
                        <label>State Abbreviation: </label>
                        <input type="text" id="state" name="state" placeholder="Enter your state"  onChange={(e) => setState(e.target.value)}/>
                    </div>

                    <div className={styles['input-container']}>
                        <label>Country Code: </label>
                        <input type="text" id="country" name="country" placeholder="Enter your country code" required  onChange={(e) => setCountry(e.target.value)}/>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

