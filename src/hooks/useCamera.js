import { useState, useRef } from 'react';

const useCamera = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraPlaceHolderRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [outputImageURL, setOutputImageURL] = useState('');
    const [cameraStream, setCameraStream] = useState(null);

    // Camera actions:
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
            setIsCameraOn(true);

            createVideoElement();
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error("Error opening camera: (SSL might be required)", error);
        }
    };
    const takeSnapshot = () => {
        createCanvasElement();
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 600, 480);
        setOutputImageURL( canvasRef.current.toDataURL('image/png'));
    };

    const closeCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        cameraPlaceHolderRef.current.removeChild(videoRef.current);
        setIsCameraOn(false);
    };


    // Video and snapshot elements:
    const createVideoElement = () => {
        cameraPlaceHolderRef.current = document.getElementById('cameraPlaceHolder');

        videoRef.current =  document.createElement('video');

        videoRef.current.width = 600;
        videoRef.current.height = 400;
        videoRef.current.autoplay = true;

        cameraPlaceHolderRef.current.appendChild(videoRef.current);
    }
    const createCanvasElement = () => {
        if( canvasRef.current !== null) return;

        const canvasPlaceHolder = document.getElementById('canvasPlaceHolder');

        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = 600;
        canvasRef.current.height = 400;

        canvasPlaceHolder.appendChild(canvasRef.current);
    }


    return {
        startCamera,
        closeCamera,
        takeSnapshot,
        isCameraOn,
        outputImageURL,
    };
};

export default useCamera;
