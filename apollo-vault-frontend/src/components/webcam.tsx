import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam, { WebcamProps } from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';

const WebcamCapture: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = useRef<Webcam>(null);
    const videoConstraints: MediaTrackConstraints = {
        width: 200,
        height: 200,
        facingMode: 'user'
    };
    const [name, setName] = useState<string>('');
    const [new_user, setNewUser] = useState<string>('');
    const [showPrompt, setShowPrompt] = useState<boolean>(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            console.log(`imageSrc = ${imageSrc}`);
            axios.post('http://127.0.0.1:5000/', { data: imageSrc })
                .then((res: { data: React.SetStateAction<string>; }) => {
                    console.log(`response = ${JSON.stringify(res.data)}`);
                    setName(res.data);
                    console.log(res.data)
                    if (res.data == "Unknown") {
                        navigate('/NewUserForm');
                        setShowPrompt(true);
                    } else {
                        navigate('/HomeMainDisplay', {state: {name: res.data}});
                        window.sessionStorage.setItem("name", JSON.stringify(res.data))
                    }

                })
                .catch((error: any) => {
                    console.error('Error:', error);
                    setName('Error occurred');
                    

                });
            

        }
    }, [webcamRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(event.target.value);
    };

    const handleButtonClick = () => {
        // Perform actions when the button is clicked
        console.log('Button clicked after entering new_user:', new_user);
    };

    return (
        <div>
            <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={350}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Click me to Start</button>
            <h2>{name}</h2>
            {showPrompt && (
                <>
                <div id='camera-container'>
                    <label htmlFor="nameInput">Enter your name:</label>
                    <input type="text" id="nameInput" value={new_user} onChange={handleInputChange} />
                    {/* Button to click after entering new_user */}
                </div>
                <button onClick={handleButtonClick}>Submit</button>
                </>
            )}
        </div>
    );
};

export default WebcamCapture;