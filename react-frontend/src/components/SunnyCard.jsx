import styles from './SunnyCard.module.css';
import happysun from '../assets/happysun.png';
import cloudysun from '../assets/cloudysun.png';


export default function SunnyCard () {
    return (
        <div className={styles['card-cloudy-container']}>
            <h1 className={styles['med-text']}>2/5</h1>
            <img src={cloudysun} height={220}></img>
            <div className={styles['temp-container']}>
                <h1 className={styles['large-text']}>26°</h1>
                <div>
                    <h3 className={styles['small-text']}>FEELS LIKE</h3>
                    <h3 className={styles['small-text']}>17°</h3>
                </div>
            </div>
            <div className={styles['sunrise-container']}>
                <h2>SUNRISE</h2>
                <h1 className={styles['large-text']}>6:58 am</h1>
            </div>
            <div className={styles['weather-container']}>
                <div className={styles['weather-sun-container']}>
                    <h3 className={styles['small-text']}>DEW POINT</h3>
                    <h2 className={styles['sub-text']}>14°</h2>
                </div>

                <div className={styles['weather-sun-container']}>
                    <h3 className={styles['small-text']}>CLOUDINESS</h3>
                    <h2 className={styles['sub-text']}>100%</h2>
                </div>

                <div className={styles['weather-sun-container']}>
                    <h3 className={styles['small-text']}>WIND SPEED</h3>
                    <h2 className={styles['submed-text']}>100mph</h2>
                </div>
                
            </div>
            <h2>high chance of a good sunrise</h2>
        </div>
    )
}