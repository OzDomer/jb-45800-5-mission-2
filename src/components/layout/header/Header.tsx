import { NavLink } from "react-router-dom"
import "./Header.css"
export default function Header(){
    return(
        <div>
            <NavLink to={"/weather"}>Home</NavLink>
            <NavLink>History</NavLink>
            <NavLink>About</NavLink>
        </div>
    )
}