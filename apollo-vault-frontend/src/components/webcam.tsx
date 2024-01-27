import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam, { WebcamProps } from 'react-webcam'; // Import WebcamProps for type annotations

const WebcamCapture: React.FC = () => {
    const webcamRef = useRef<Webcam>(null); // Add type annotation for useRef
    const videoConstraints: MediaTrackConstraints = { // Add type annotation for videoConstraints
        width: 200,
        height: 200,
        facingMode: 'user'
    };
    const [name, setName] = useState<string>(''); // Add type annotation for name state
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot(); // Add type annotation for imageSrc
        if (imageSrc) {
            console.log(`imageSrc = ${imageSrc}`);
            axios.post('http://127.0.0.1:5000/', { data: imageSrc })
                .then((res: { data: React.SetStateAction<string>; }) => {
                    console.log(`response = ${JSON.stringify(res.data)}`);
                    setName(res.data); // Assuming response is a string
                })
                .catch((error: any) => {
                    console.error('Error:', error);
                    setName('Error occurred');
                });
        }
    }, [webcamRef]);

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
            <button onClick={capture}>Click me!</button>
            <h2>{name}</h2>
        </div>
    );
};

export default WebcamCapture;