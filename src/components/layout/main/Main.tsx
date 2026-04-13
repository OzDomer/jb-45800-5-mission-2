import { Navigate, Route, Routes } from "react-router-dom";

export default function Main() {

    return(
        <Routes>
             {/* "/" means the default path the app will redirect to */}
            <Route path="/" element={<Navigate to="/PLACEHOLDER" />} />
        </Routes>
    )

}