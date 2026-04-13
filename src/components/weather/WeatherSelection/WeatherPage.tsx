import "./WeatherPage.css"
import { useEffect, useState } from "react"
import type CurrentWeather from "../../../models/CurrentWeather"
import axiosInstance from "../../../api/use-service"
import WeatherInformation from "../WeatherInformation/WeatherInformation"
function getCities(): string[] {
    return ['Tel Aviv', 'New York', 'Los Angeles']
}

export default function WeatherPage() {

    const [cities, setCities] = useState<string[]>([])
    const [weather, setWeather] = useState<CurrentWeather | null>(null)
    
    async function displaySelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const response = await axiosInstance.get<CurrentWeather>('/current.json', { params: { q: event.currentTarget.value } }) 
    setWeather(response.data)
    }

    useEffect(() => {
        (async() => {
            setCities(getCities())
        })()
    }, [])
    return(
 <div className="WeatherPage">
            <select onChange={displaySelection} defaultValue="">
                <option value="" disabled>Select a city</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            {weather &&
            <WeatherInformation
               weather={weather} 
            />
            }
        </div>
    )
}
