import { useState, useRef } from 'react';

const useCamera = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraPlaceHolderRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [outputImageURL, setOutputImageURL] = useState('');

    // Camera actions:
    const startCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            setIsCameraOn(true);

            createVideoElement();

            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            });
        } else {
            alert("can not open camera, SSL needs to be activated.");
        }
    };
    const takeSnapshot = () => {
        createCanvasElement();
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 600, 480);
        setOutputImageURL( canvasRef.current.toDataURL('image/png'));
    };
    const closeCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        });

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

        canvasPlaceHolder.appendChild( canvasRef.current);
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
