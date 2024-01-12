import React, {useState} from 'react';
import useImageReader from "../hooks/useImageReader";

const MobileReader = () => {
    const [generatedText, setGeneratedText] = useState('');
    const [outputImage, setOutputImage] = useState('')

    const {isConverting, readImageFromURL} = useImageReader()

    const convert = async () => {
        setGeneratedText(await readImageFromURL(outputImage));
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                // Create a FileReader object to read the file content
                const reader = new FileReader();

                // Define a callback function to handle the file read completion
                reader.onload = (event) => {
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

                <div className="mt-8">
                    <button onClick={convert} disabled={isConverting || !outputImage}
                            className="disabled:bg-gray-400 text-white bg-blue-500 px-4 py-2 rounded">
                        Convert
                    </button>
                </div>

                {
                    generatedText.length > 0 ?
                        <hr className="bg-blue-900 pb-0.5 mt-8 mb-4 rounded-2xl overflow-hidden"/>
                        : null
                }

                {
                    generatedText.length > 0 ? (
                        <div className="text-xl max-w-2xl mb-16">
                            <div className="mb-2 text-lg font-bold leading-relaxed">Converted text:</div>
                            <div className="text-green-700 font-bold leading-relaxed">{generatedText}</div>
                        </div>
                    ) : null
                }
            </div>
        );

}

export default MobileReader;
