import NavBarHome from './Home_Main_Nav'
import { useState } from 'react'
import './HomeMainDisplay.css'; // Import the CSS file

function HomeMainDisplay() {
    return (
        <>
            <NavBarHome />
            <div className="welcome-container">
                <h1>Welcome Back to APOLLO VAULT!</h1>
                <p>Please add any new records to the database by clicking <strong>Health Form</strong></p>
                <p>Or if you would like to review old records then press <strong>Records Display</strong></p>
            </div>
        </>
    )
}

export default HomeMainDisplay;
