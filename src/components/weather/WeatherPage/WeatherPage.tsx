import "./WeatherPage.css"
import { useEffect, useState } from "react"
import type CurrentWeather from "../../../models/CurrentWeather"
import axiosInstance from "../../../api/use-service"
import WeatherInformation from "../WeatherInformation/WeatherInformation"
import type City from "../../../models/CityResponse"
import axios from "axios"
import type CityRecord from "../../../models/CityRecords"

export default function WeatherPage() {

    const [weather, setWeather] = useState<CurrentWeather | null>(null)
    const [cities, setCities] = useState<CityRecord[]>([])

    async function displaySelection(event: React.ChangeEvent<HTMLSelectElement>) {
        //  we have to remove ' in city name the weather api does not accept names that include those
        const response = await axiosInstance.get<CurrentWeather>('/current.json', { params: { q: event.currentTarget.value.replace(/'/g, "") } }) 
        setWeather(response.data)
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get<City>("https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1500")
                // some cities have no en value have to filter those out (cant send them to the api) and some cities appear twice in the data we filter those out too
                setCities(data.result.records.filter((city, index, cities) =>
                    city.city_name_en.trim() !== "" && cities.findIndex(c => c.city_name_en.trim() === city.city_name_en.trim()) === index
                ))
            }
            catch (e) {
                console.log(e)
            }
            finally { }
        })()
    }, [])
    return (
        <div className="WeatherPage">
            <select onChange={displaySelection} defaultValue="">
                <option value="" disabled>Select a city</option>
                {cities.map((city, index) => (
                    <option key={index} value={city.city_name_en.trim()}>{city.city_name_he}</option>
                ))}

            </select>
            {weather &&
                <WeatherInformation
                    weather={weather}
                />
            }
        </div>
    )
}
