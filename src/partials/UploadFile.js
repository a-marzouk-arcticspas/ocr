import React, {useState} from 'react';
import useTesseractImageConverter from "../hooks/useTesseractImageConverter";
import BasicButton from "../components/BasicButton";
import useAwsTextractImageConverter from "../hooks/useAwsTextractImageConverter";
import GeneratedTextView from "../components/GeneratedTextView";

const UploadFile = ({activeAPI = "tesseract"}) => {
    const {convertImageToText: tesseractConvert, isConverting: isTesseractConverting} = useTesseractImageConverter();
    const {
        convertImageToText: awsTextractConvert,
        isConverting: isAwsTextractConverting
    } = useAwsTextractImageConverter();


    const [generatedText, setGeneratedText] = useState(null);
    const [outputImage, setOutputImage] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)

    const convert = async () => {
        const result = activeAPI === 'tesseract' ? await tesseractConvert(outputImage) : await awsTextractConvert(uploadedFile);

        setGeneratedText(result);
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            setUploadedFile(file);

            try {
                // Create a FileReader object to read the file content
                const reader = new FileReader();

                // Define a callback function to handle the file read completion
                reader.onload = async (event) => {
                    setOutputImage(event.target.result);
                };

                // Read the file as a Data URL
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error reading the file:', error);
            }
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="image/*;capture=camera"
                   className="text-sm lg:text-2xl max-w-full m-auto border-2 rounded"/>

            <div>
                {outputImage ? (
                    <div>
                        <img
                            src={outputImage}
                            alt="Preview"
                            className="max-w-full mt-8 rounded-2xl m-auto"
                        />
                    </div>
                ) : null}
            </div>

            <BasicButton isDisabled={isTesseractConverting || isAwsTextractConverting || !outputImage} action={convert}
                         title="Convert" cssClasses="mt-8"/>

            <GeneratedTextView text={generatedText}/>

        </div>
    );

}

export default UploadFile;
