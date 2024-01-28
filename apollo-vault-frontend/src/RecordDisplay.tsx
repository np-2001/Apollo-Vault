import NavBar from './Navbar'
import {useState, useEffect} from 'react'
import './RecordDisplay.css'
import { database } from './firebase';
import { ref, onValue, push, get, DataSnapshot,  } from 'firebase/database';




const hash = "apollo_data/"
const retrieve = "-NpD5Mdya2qQAvc1WIbS"

type DataObject = {
    name: string;
    dob: string;
    insurance: string;
    symptoms: string;
}

function RecordDisplay() {
    const [data, setData] = useState<DataObject[]>([])
    useEffect(() => {

        const dataRef = ref(database, hash)

        get(dataRef).then((snapshot: DataSnapshot) => {
            let temp: DataObject[] = []
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    const val = child.val()
                    let displayData = {
                        name: val.name,
                        dob: val.dob,
                        insurance: val.insuranceDetails,
                        symptoms: val.reportedSymptoms
                    }
                    temp.push(displayData)
                })
                setData(temp)
            } else {
                console.log('No data available');
            }
        }).catch((error: any) => {
            console.error(error);
        });
    }, [])

    return (
        <>
            <NavBar/>
            <div id='data'>
                {data && data.map((item) => (
                    <>
                        <h1 id='record-name'>{data[0].name}'s medical records</h1>
                        <div id='dob-container'>
                            <h3 id='dob'>Date of Birth: </h3>
                            <h3>{item.dob}</h3>
                        </div>
                        <div id='insurance-container'>
                            <h3 id='insurance'>Insurance:</h3>
                            <h3>{item.insurance}</h3>
                        </div>
                        <div id='insurance-container'>
                            <h3 id='symptoms'>Symptoms: </h3>
                            <h3>{item.symptoms}</h3>
                        </div>
                        </>
                ))}
            </div>
        </>
    )
}

export default RecordDisplay;