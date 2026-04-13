import axios from "axios"

// base URL and API key loaded from .env.development (git ignored)
const axiosInstance = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    params: {
        key: import.meta.env.VITE_WEATHER_API_KEY
    }
})
export default axiosInstance