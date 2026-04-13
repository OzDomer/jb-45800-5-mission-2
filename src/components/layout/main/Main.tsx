import { Navigate, Route, Routes } from "react-router-dom";
import WeatherPage from "../../weather/WeatherSelection/WeatherPage";

export default function Main() {

    return(
        <Routes>
            <Route path="/" element={<Navigate to="weather" />} />
            <Route path="/weather" element={<WeatherPage/>} />
        </Routes>
    )

}