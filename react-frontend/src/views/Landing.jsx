import background from "../assets/sky.png";
import logo from '../assets/logo.png';
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
                        <input type="text" id="state" name="state" placeholder="Enter your state"  onChange={(e) => setState(e.target.value)}/>
                    </div>

                    <div className={styles['input-container']}>
                        <label>country</label>
                        <input type="text" id="country" name="country" placeholder="Enter your country code" required  onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                    <div className={styles['button-container']}>
                        <button type="submit">calculate!</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

