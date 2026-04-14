import "./HistoryPage.css"
import type HistoryEntry from "../../../models/HistoryEntry"

export default function HistoryPage() {
    const history: HistoryEntry[] = JSON.parse(localStorage.getItem("history") || "[]")
        JSON.parse(localStorage.getItem("history") || "[]")
    

    return (
        <div className="HistoryPage">
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((city, index) => (
                        <tr key={index}>
                            <td>{city.timeStamp}</td>
                            <td>{city.cityName.replace(/`/g, "")}</td>
                            <td>{city.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}