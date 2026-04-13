import type CurrentWeather from "../../../models/CurrentWeather"
import "./WeatherInformation.css"

interface WeatherInformationProps{
    weather: CurrentWeather
}



export default function WeatherInformation(props: WeatherInformationProps) {
    
    const {
    location: {name, country, localtime}, 
    current: {last_updated ,temp_c, 
    condition: {text, icon }, wind_kph, wind_dir,humidity,feelslike_c}} = props.weather
        
    return(
          <div className="WeatherInformation">
        <h2>{name}, {country}</h2>
        <p>Local time: {localtime}</p>
        <p>Last updated: {last_updated}</p>
        <img src={`https:${icon}`} alt={text} />
        <p>{text}</p>
        <p>Temperature: {temp_c}°C</p>
        <p>Feels like: {feelslike_c}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind_kph} kph {wind_dir}</p>
    </div>
    )
}