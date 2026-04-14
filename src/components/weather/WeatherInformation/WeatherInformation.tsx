import type CurrentWeather from "../../../models/CurrentWeather"
import "./WeatherInformation.css"

interface WeatherInformationProps {
    weather: CurrentWeather
    region: string | null
    cityNameHe: string | null
}

export default function WeatherInformation(props: WeatherInformationProps) {
    const { weather, region, cityNameHe } = props
    const {
        location: { name, country, localtime },
        current: { last_updated, temp_c,
            condition: { text, icon }, wind_kph, wind_dir, humidity, feelslike_c }
    } = weather

    return (
        <div className="WeatherInformation">
            <h2 dir="rtl">{cityNameHe ? cityNameHe.trim() : name.replace(/`/g, "")}</h2>
            <h3>{region ? ("Region: " + region) : country}</h3>

            <div className="condition-row">
                <img src={"https:" + icon} alt={text} />
                <span>{text}</span>
            </div>

            <div className="temp-block">
                <span className="temp-main">{temp_c}°</span>
                <div className="temp-feels">
                    <strong>{feelslike_c}°C</strong>
                    feels like
                </div>
            </div>

            <div className="data-grid">
                <div className="data-item">
                    <div className="label">Humidity</div>
                    <div className="value">{humidity}%</div>
                </div>
                <div className="data-item">
                    <div className="label">Wind</div>
                    <div className="value">{wind_kph} kph {wind_dir}</div>
                </div>
                <div className="data-item">
                    <div className="label">Country</div>
                    <div className="value">{country}</div>
                </div>
                <div className="data-item">
                    <div className="label">Local time</div>
                    <div className="value">{localtime.split(" ")[1]}</div>
                </div>
                <div className="data-item">
                    <div className="label">Last updated</div>
                    <div className="value">{last_updated.split(" ")[1]}</div>
                </div>
            </div>
        </div>
    )
}
