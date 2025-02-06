import styles from './SunnyCard.module.css';
import happysun from '../assets/happysun.png';
import cloudysun from '../assets/cloudysun.png';

// We use props to pass state across different components in React
export default function SunnyCard (props) {
    // threshold between good and bad sunrise
    const threshold = 0.5
    return (
        // Conditionally use CSS classes depending on whether it's a good sunrise or not
        // Lots of CSS Flexboxes again
        <div className={props['day']['score'] > threshold ? styles['card-sun-container'] : styles['card-cloudy-container']}>
            <h1 className={styles['med-text']}>{props['day']['date']}</h1>
            {props['day']['score'] > threshold ? <img src={happysun} height={250}></img> : <img src={cloudysun} height={250}></img>}
            <div className={styles['temp-container']}>
                <h1 className={styles['large-text']}>{props['day']['temperature']}°</h1>
                <div>
                    <h3 className={styles['small-text']}>FEELS LIKE</h3>
                    <h3 className={styles['small-text']}>{props['day']['feelslike']}°</h3>
                </div>
            </div>
            <div className={styles['sunrise-container']}>
                <h2>SUNRISE</h2>
                <h1 className={styles['large-text']}>{props['day']['sunrisetime']} am</h1>
            </div>
            <div className={styles['weather-container']}>
                <div className={ props['day']['score'] > threshold ? styles['weather-sun-container'] : styles['weather-cloud-container']}>
                    <h3 className={styles['small-text']}>DEW POINT</h3>
                    <h2 className={styles['sub-text']}>{props['day']['dewpoint']}°</h2>
                </div>

                <div className={ props['day']['score'] > threshold ? styles['weather-sun-container'] : styles['weather-cloud-container']}>
                    <h3 className={styles['small-text']}>CLOUDINESS</h3>
                    <h2 className={styles['sub-text']}>{props['day']['cloudiness']}%</h2>
                </div>

                <div className={ props['day']['score'] > threshold ? styles['weather-sun-container'] : styles['weather-cloud-container']}>
                    <h3 className={styles['small-text']}>WIND SPEED</h3>
                    <h2 className={styles['submed-text']}>{props['day']['windspeed']}mph</h2>
                </div>
                
            </div>
            '<h2>{props['day']['score'] > threshold ? 'high' : 'low'} chance of a good sunrise</h2>
        </div>
    )
}