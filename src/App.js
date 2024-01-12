import './App.css';
import ImageReader from "./components/ImageReader";
import CameraImageReader from "./components/CameraImageReader";
import {useState} from "react";
import MobileReader from "./components/MobileReader";

function App() {

    const [convertType, setConvertType] = useState("mobile");

    const radioOptions = [
        {id: 'url', value: 'url', label: 'Image from a URL'},
        {id: 'camera', value: 'camera', label: 'Use Camera'},
        {id: 'mobile', value: 'mobile', label: 'Use Mobile Camera To Take a Photo'},
    ];

    const handleRadioChange = (event) => {
        setConvertType(event.target.value); // Update convertType with the selected radio button value
    };
    return (
        <div className="App">
            <header className="App-header ">
                <div className="text-xl">
                    Basic OCR App, please choose convertion method
                </div>
                <div className="mt-4">
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


                <div>
                    {convertType === 'url' ? (
                        <ImageReader/>
                    ) : convertType === 'camera' ? (
                        <CameraImageReader/>
                    ) : (
                        <MobileReader/>
                    )}
                </div>

            </header>
        </div>
    );
}

export default App;
