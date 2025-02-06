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
                {
                    location.state['weather'].map((forecast) => (
                    <SunnyCard key={forecast['date']} day={forecast}/>
                    ))
                }
            </div>
            
        </div>
    );
  }
  
  