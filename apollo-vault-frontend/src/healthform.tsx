import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChangeEvent, FormEvent } from 'react';


export default function Health() {
    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
        insurance: "",
        symptoms: "",
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
        //Conver data into json file and send to blockchain
        // Handle the form submission here
    };

    return (
        <div> {/* Wrapper div */}
            <h1 id="title">Health Record Form</h1>
            <form id="survey-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="insurance">Insurance:</label>
                    <input
                        type="text"
                        id="insurance"
                        name="insurance"
                        value={formData.insurance}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="symptoms">Symptoms:</label>
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