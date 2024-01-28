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
                <h3 id='dob'>Date of Birth: {data.dob}</h3>
                <h3 id='insurance'>Insurance: {data.insurance}</h3>
                <h3 id='symptoms'>Symptoms: {data.symptoms}</h3>
            </div>
            {/* <h3 id='smoking'>Smoking: </h3>
            <h3 id='alcohol'>Alcohol: </h3>
            <h3 id='dietary'>Dietary Restrictions: </h3> */}
        </>
    )
}

export default RecordDisplay;