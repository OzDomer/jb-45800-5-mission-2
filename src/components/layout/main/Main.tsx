import { Navigate, Route, Routes } from "react-router-dom";
import WeatherPage from "../../weather/WeatherPage/WeatherPage";
import NotFound from "../../not-found/NotFound";

export default function Main() {

    return(
        <Routes>
            <Route path="/" element={<Navigate to="/weather" />} />
            <Route path="/weather" element={<WeatherPage/>} />
             <Route path="*" element={<NotFound/>} />
        </Routes>
    )

}