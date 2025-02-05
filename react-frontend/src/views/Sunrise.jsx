import background from "../assets/sky.png";
import logo from '../assets/logo.png';
import styles from './Sunrise.module.css';
import {useLocation} from 'react-router-dom';
import SunnyCard from "../components/SunnyCard";

export default function SunrisePage() {
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
                <SunnyCard/>
                <SunnyCard/>
                <SunnyCard/>
            </div >

            {/* <div className={styles['masonry-container']}>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>CLOUDINESS</h1>
                    <h1 className={styles['number']}>{location.state['cloudiness']}%</h1>
                </div>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>DEW POINT</h1>
                    <h1 className={styles['number']}>{location.state['dewpoint']}°F</h1>
                </div>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>WIND SPEED</h1>
                    <h1 className={styles['number']}>{location.state['windspeed']}mph</h1>
                </div>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>TEMPERATURE</h1>
                    <h1 className={styles['number']}>{location.state['temperature']}°F</h1>
                </div>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>FEELS LIKE</h1>
                    <h1 className={styles['number']}>{location.state['feelslike']}°F</h1>
                </div>
                <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>TIME OF SUNRISE (CST)</h1>
                    <h1 className={styles['number']}>{location.state['sunrisetime']}AM</h1>
                </div>
            </div>

            <div className={styles['header-div']}>
                    <h1 className={styles['tags']}>Chance of a Good Sunrise : <b>{
                        location.state['score'] > 6 ? 'HIGH' : 'LOW'}</b>
                        </h1>
                    
            </div> */}
            
        </div>
    );
  }
  
  