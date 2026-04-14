import { Navigate, Route, Routes } from "react-router-dom";
import WeatherPage from "../../weather/WeatherPage/WeatherPage";
import NotFound from "../../not-found/NotFound";
import HistoryPage from "../../history/HistoryPage/HistoryPage";
import AboutPage from "../../about/AboutPage";

export default function Main() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/weather" />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/history" element={<HistoryPage />}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}