import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChangeEvent, FormEvent } from 'react';
import NavBar from './Home_Main_Nav';
import "./healthform.css"
import { database } from './firebase';
import { ref, onValue, push } from 'firebase/database';

export default function Health() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        insurance: "",
        symptoms: "",
    });
    const location = useLocation();
    const state = location.state
    const name = window.sessionStorage.getItem("name")

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        const path = "/"+name
        const dataRef = ref(database, path);
        
        const formDataDict = {
            name: formData.name,
            dob: formData.dob,
            insuranceDetails: formData.insurance,
            reportedSymptoms: formData.symptoms,
            // add more fields or transformations as needed
        };

        push(dataRef, formDataDict)
        .then(() => {
            console.log('Data saved successfully!');
            // Handle successful submission (e.g., clear form, show message)
        })
        .catch((error) => {
            console.error('Error writing data to Firebase', error);
            // Handle errors here
        });
        //Conver data into json file and send to blockchain
        // Handle the form submission here
    };

    return (
        <div id="wrapper"> {/* Wrapper div */}
            <NavBar/>
            <h1 id="title">Health Record Form</h1>
            <form id="survey-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="dateOfBirth">Date of Birth: </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="insurance">Insurance: </label>
                    <input
                        type="text"
                        id="insurance"
                        name="insurance"
                        value={formData.insurance}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="symptoms">Symptoms: </label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}