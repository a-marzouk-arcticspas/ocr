import './App.css';
import ImageReader from "./components/ImageReader";
import CameraImageReader from "./components/CameraImageReader";
import {useState} from "react";
import MobileReader from "./components/MobileReader";

function App() {

    const [convertType, setConvertType] = useState("url");

    const radioOptions = [
        {id: 'url', value: 'url', label: 'Image URL'},
        {id: 'camera', value: 'camera', label: 'Use Camera (best for desktop)'},
        {id: 'mobile', value: 'mobile', label: 'Upload file (best for mobile)'},
    ];

    const handleRadioChange = (event) => {
        setConvertType(event.target.value); // Update convertType with the selected radio button value
    };
    return (
        <div className="min-h-screen bg-blue-100 py-14 px-6">
            <div className="m-auto max-w-4xl">
                <div className="text-3xl text-center mb-12">
                    OCR using <a className="text-blue-600 underline" href="https://tesseract.projectnaptha.com/">Tesseract</a>
                </div>
                <div className="text-lg font-bold">Please select input method</div>
                <div className="mt-2 mb-8">
                    {/* Render radio buttons based on the radioOptions array */}
                    {radioOptions.map((option) => (
                        <div key={option.id} className="flex gap-3 items-center text-xl">
                            <input
                                type="radio"
                                id={option.id}
                                name="convertType"
                                value={option.value}
                                checked={convertType === option.value} // Set checked based on the current convertType value
                                onChange={handleRadioChange} // Call handleRadioChange on radio button change event
                            />
                            <label htmlFor={option.id}> {option.label}</label>
                        </div>
                    ))}
                </div>

                <hr className="bg-blue-900 pb-0.5 mb-4"/>


                <div>
                    {convertType === 'url' ? (
                        <ImageReader/>
                    ) : convertType === 'camera' ? (
                        <CameraImageReader/>
                    ) : (
                        <MobileReader/>
                    )}
                </div>

            </div>
        </div>
    );
}

export default App;
