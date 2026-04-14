import "./WeatherPage.css"
import { useEffect, useState } from "react"
import type CurrentWeather from "../../../models/CurrentWeather"
import axiosInstance from "../../../api/use-service"
import WeatherInformation from "../WeatherInformation/WeatherInformation"
import type City from "../../../models/CityResponse"
import axios from "axios"
import type CityRecord from "../../../models/CityRecords"
import type HistoryEntry from "../../../models/HistoryEntry"
import ErrorSpinner from "../../common/errorSpinner/ErrorSpinner"
import Spinner from "../../common/loadingSpinner/LoadinSpinner"

export default function WeatherPage() {

    const [weather, setWeather] = useState<CurrentWeather | null>(null)
    const [cities, setCities] = useState<CityRecord[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
    const [selectedCityHe, setSelectedCityHe] = useState<string | null>(null)


    async function displaySelection(event: React.ChangeEvent<HTMLSelectElement>) {
        //  we have to remove ' in city name the weather api does not accept names that include those
        //  capture value before any await — event.currentTarget becomes null after async suspension
        const cityName = event.currentTarget.value.replace(/'/g, "")
        const selected = cities.find(c => c.city_name_en.trim().replace(/'/g, "") === cityName)
        try {
            setLoading(true)
            setError(null)
            const validCountries = ["Israel", "Palestinian Territory", "West Bank"]
            let response
            try {
                response = await axiosInstance.get<CurrentWeather>('/current.json', { params: { q: cityName } })
                // only validate country on the direct lookup — bureau fallback is from verified Israeli gov data
                if (!validCountries.includes(response.data.location.country)) throw new Error("outside Israel")
            } catch {
                // city not found or outside Israel — fall back to the bureau city's English name
                const bureauCity = cities.find(c =>
                    c.PIBA_bureau_name.trim() === selected?.PIBA_bureau_name?.trim() &&
                    c.city_name_he.trim() === c.PIBA_bureau_name.trim()
                )
                if (!bureauCity) throw new Error("City not found")
                response = await axiosInstance.get<CurrentWeather>('/current.json', { params: { q: bureauCity.city_name_en.trim() } })
            }
            setSelectedRegion(selected?.PIBA_bureau_name || null)
            setSelectedCityHe(selected?.city_name_he || null)
            setWeather(response.data)
            // after selecting a value it gets pushed to local storage with requested params
            const entry: HistoryEntry = {
                timeStamp: new Date().toLocaleString(),
                cityName: response.data.location.name,
                country: response.data.location.country
            }
            const existing = JSON.parse(localStorage.getItem("history") || "[]")
            localStorage.setItem("history", JSON.stringify([...existing, entry]))
        }
        catch (e) {
            setWeather(null)
            setError("Could not find a major city close to requested city")
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const { data } = await axios.get<City>("https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=1500")
                const records = data.result.records
                // filter out: cities with no english name, no bureau name, duplicates,
                // and cities without bureau city has no english name (fallback would fail)
                setCities(records.filter((city, index) =>
                    city.city_name_en.trim() !== "" &&
                    city.PIBA_bureau_name && city.PIBA_bureau_name.trim() !== "" &&
                    records.findIndex(c => c.city_name_en.trim() === city.city_name_en.trim()) === index &&
                    records.some(c => c.city_name_he.trim() === city.PIBA_bureau_name.trim() && c.city_name_en.trim() !== "")
                ))

            }
            catch (e) { 
                console.log(e)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])
    return (
        <div className="WeatherPage">
            <h1>Israel Weather</h1>
            {loading &&
            <div>
            <p>Loading...</p>
            <Spinner />
            </div>}
            {!loading && cities.length > 0 &&
                <select onChange={displaySelection} defaultValue="" dir={selectedCityHe ? "rtl" : "ltr"}>
                    <option value="" disabled>Select a city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.city_name_en.trim()} dir="rtl">
                            {city.city_name_he.trim() === city.PIBA_bureau_name.trim()
                                ? city.city_name_he
                                : `${city.city_name_he} (מחוז: ${city.PIBA_bureau_name.trim()})`}
                        </option>


                    ))}
                </select>
            }
            {weather && <WeatherInformation weather={weather} region={selectedRegion} cityNameHe={selectedCityHe} />}
            {error &&
            <div>
            <p>{error}
            </p>
            <ErrorSpinner/>
            </div>}

        </div>
    )
}
