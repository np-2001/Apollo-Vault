import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChangeEvent, FormEvent } from 'react';
import NavBar from './Home_Main_Nav';
import "./healthform.css"
import { database } from './firebase';
import { ref, onValue, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function NewUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
        Gender: "",
        Ethnicity: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        const path = '/about/hash'
        const dataRef = ref(database, path);
        
        const formDataDict = {
            name: formData.name,
            dob: formData.dateOfBirth,
            Gender: formData.Gender,
            Ethnicity: formData.Ethnicity,
            // add more fields or transformations as needed
        };

        push(dataRef, formDataDict)
        .then(() => {
            console.log('Data saved successfully!');
            navigate('/HomeMainDisplay');
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
            <h1 id="title">New User Form</h1>
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
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="insurance">Gender: </label>
                    <input
                        type="text"
                        id="Gender"
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="symptoms">Ethnicity: </label>
                    <textarea
                        id="Ethnicity"
                        name="Ethnicity"
                        value={formData.Ethnicity}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}