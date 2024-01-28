import { NavLink } from "react-router-dom";

import './styles.css'

export function NavBar() {
  return (
    <nav className="navbar-container">
        <ul>
            <li><a href="/" className="site-title"> APOLLO-VAULT</a></li>
        </ul>
        <img src="src/assets/logo.webp" id="logo"/>
    </nav>
  );
}

export default NavBar;
