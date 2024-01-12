import {useEffect, useRef, useState} from "react";
import Tesseract from "tesseract.js";

export default function useImageReader() {
    const workerRef = useRef(null);
    const [isConverting, setIsConverting] = useState(false);

    /* Setup web worker for Tesseract */
    useEffect(  () => {
        async function setupWorker(){
            workerRef.current = await Tesseract.createWorker('eng');
        }

        setupWorker().then(() => console.log("Worker is ready"));
    });
    const readImageFromURL = async (imageURL) => {
        if(!imageURL) return alert("Please insert image url");

        setIsConverting(true);

        try {
            const {data: {text}} = await workerRef.current.recognize(imageURL);

            return text;
        } catch (e) {
            console.log(e)

            alert("Error while converting, please check the console for more details...")
        } finally {
            setIsConverting(false);

            await workerRef.current.terminate();
        }
    }

    return {
        readImageFromURL,
        isConverting
    }
}