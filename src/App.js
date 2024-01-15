import {useState} from "react";
import './App.css';
import ImageURL from "./partials/ImageURL";
import CameraSnapshot from "./partials/CameraSnapshot";
import UploadFile from "./partials/UploadFile";
import RadioGroup from "./components/RadioGroup";
import Divider from "./components/Divider";

function App() {
    const [convertType, setConvertType] = useState("url");
    const [activeAPI, setActiveAPI] = useState("tesseract")

    const convertTypeOptions = [
        {id: 'url', value: 'url', label: 'Image URL'},
        {id: 'camera', value: 'camera', label: 'Use Camera (best for desktop)'},
        {id: 'mobile', value: 'mobile', label: 'Upload file (best for mobile)'},
    ];

    const apiOptions = [
        {id: 'tesseract', value: 'tesseract', label: 'Tesseract'},
        {id: 'textract', value: 'textract', label: 'Amazon Textract'},
    ];

    const handleConvertTypeChange = (event) => {
        setConvertType(event.target.value); // Update convertType with the selected radio button value
    };

    const handleActiveAPIChange = (event) => {
        setActiveAPI(event.target.value); // Update convertType with the selected radio button value
    };

    return (
        <div className="min-h-screen bg-gray-200 py-14 px-6">
            <div className="m-auto max-w-4xl">
                <div className="text-3xl text-center mb-12">
                    OCR using
                    <a className="text-blue-600 underline pl-2"
                       href="https://tesseract.projectnaptha.com/">Tesseract</a> /
                    <a href="https://aws.amazon.com/textract/" className="text-blue-600 underline pl-2">Amazon
                        Textract</a>
                </div>


                <RadioGroup title="Please select active API" name="activeAPIRadio" options={apiOptions}
                            handleRadioChange={handleActiveAPIChange} selectedOption={activeAPI}/>

                <RadioGroup title="Please select input method" name="convertTypeRadio" options={convertTypeOptions}
                            handleRadioChange={handleConvertTypeChange} selectedOption={convertType}/>

                <Divider/>

                <div>
                    {
                        convertType === 'url' ? <ImageURL activeAPI={activeAPI}/> :
                        convertType === 'camera' ? <CameraSnapshot activeAPI={activeAPI}/> :
                        <UploadFile activeAPI={activeAPI}/>
                    }
                </div>

            </div>
        </div>
    );
}

export default App;
