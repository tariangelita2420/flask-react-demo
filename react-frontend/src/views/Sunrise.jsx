import background from "../assets/sky.png";
import logo from '../assets/logo.png';
import styles from './Sunrise.module.css';
import {useLocation} from 'react-router-dom';
import SunnyCard from "../components/SunnyCard";

export default function SunrisePage() {
    // location gets you 'state' which is the weather data that our backend API returns
    const location = useLocation();
    return (
        <div className={styles['landing-main']} style={{ backgroundImage: `url(${background})`}}>
            <div className={styles['nav']}>
                <a href="/">
                    <img src={logo} height={80}></img>
                </a>
                <h2 className={styles['nav-text']}>sunrise w sarv</h2>
            </div>
            <h1 className={styles['heading']}>Results for {location.state['city']}</h1>
            
            <div className={styles['masonry-container']}>
                {/* This loops through multiday forecast an array/list and renders 
                    a the React Component SunnyCard for each day's weather forecast */}
                {
                    location.state['weather'].map((forecast) => (
                    <SunnyCard key={forecast['date']} day={forecast}/>
                    ))
                }
            </div>
            
        </div>
    );
  }
  
  