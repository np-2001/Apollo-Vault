import { NavLink } from "react-router-dom";

import './styles.css'

export function NavBar() {
  return (
    <nav className="navbar-container">
        <a href="/" className="site-title"> APOLLO-VAULT</a>
        <ul>
            <li>
                <a href="/About"> About </a>
                
            </li>
            <li> <a href="/Team"> Meet the Team</a> </li>
            <li> <a href="/Display">Record Display</a></li>
            
        </ul>

    </nav>
  );
}

export default NavBar;
