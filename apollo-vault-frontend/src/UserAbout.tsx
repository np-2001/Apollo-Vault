import NavBar from './Home_Main_Nav'
import {useState} from 'react'
import './RecordDisplay.css'

function AboutPage() {
    const [data, setData] = useState({
        name: "Nitin",
        dob: "1/1/2000",
        gender: "Male",
        ethnicity: "Asian"
    })
    return (
        <>
        <NavBar/>
            <div id='data'>
                <h1 id='record-name'>{data.name}'s personal info</h1>
                <div id='dob-container'>
                    <h3 id='dob'>Date of Birth: </h3>
                    <h3>{data.dob}</h3>
                </div>
                <div id='insurance-container'>
                    <h3 id='ethnicity'>Ethnicity: </h3>
                    <h3>{data.ethnicity}</h3>
                </div>
                <div id='insurance-container'>
                    <h3 id='gender'>Gender: </h3>
                    <h3>{data.gender}</h3>
                </div>
            </div>
        </>
    )
 
}

export default AboutPage;