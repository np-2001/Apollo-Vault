import { NavLink } from "react-router-dom";

import './styles.css'

export function NavBar() {
  return (
    <nav className="navbar-container">
        <ul>
            <li><a href="/" className="site-title"> APOLLO-VAULT</a></li>
            <li> <a href="/Display">Record Display</a></li>
            <li> <a href="/HealthForm">Health Form Submission</a></li>
            <li> <a href="/HomeMainDisplay">Home</a></li>
            <li> <a href="/About">About</a></li>
        </ul>
        <img src="src/assets/logo.webp" id="logo"/>
    </nav>
  );
}

export default NavBar;
