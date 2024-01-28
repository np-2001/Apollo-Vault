import { NavLink } from "react-router-dom";

import './styles.css'

export function NavBar() {
  return (
    <nav className="navbar-container">
        <a href="/" className="site-title"> APOLLO-VAULT</a>
        <ul>
            <li> <a href="/Display">Record Display</a></li>
            <li> <a href="/HealthForm">Health Form Submission</a></li>
            
        </ul>

    </nav>
  );
}

export default NavBar;
