import NavBar from './Navbar'
import {useState} from 'react'
import './RecordDisplay.css'

function RecordDisplay() {
    const [data, setData] = useState({
        name: "Test",
        dob: "1/1/2000",
        insurance: "Blue Cross Blue Shield",
        symptoms: "Coughing"
    })
    return (
        <>
            <NavBar/>
            <div id='data'>
                <h1 id='record-name'>{data.name}'s medical records</h1>
                <div id='dob-container'>
                    <h3 id='dob'>Date of Birth: </h3>
                    <h3>{data.dob}</h3>
                </div>
                <div id='insurance-container'>
                    <h3 id='insurance'>Insurance:</h3>
                    <h3>{data.insurance}</h3>
                </div>
                <div id='insurance-container'>
                    <h3 id='symptoms'>Symptoms: </h3>
                    <h3>{data.symptoms}</h3>
                </div>
            </div>
        </>
    )
}

export default RecordDisplay;