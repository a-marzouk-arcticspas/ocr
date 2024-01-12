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
                       className="text-sm lg:text-2xl max-w-full m-auto border-2 rounded mt-16 mb-8"/>

                <div>
                    {outputImage ? (
                        <div>
                            <img
                                src={outputImage}
                                alt="Preview"
                                className="max-w-full p-6 lg:max-w-2xl mt-4 rounded-2xl m-auto"
                            />
                        </div>
                    ) : null}
                </div>

                <div className="flex gap-3 justify-center">
                    <button onClick={convert} disabled={isConverting || !outputImage}
                            className="disabled:bg-gray-400 bg-green-900 px-4 py-2 rounded mb-6 mt-6">
                        Convert
                    </button>
                </div>


                <hr className="mt-16"/>

                {
                    generatedText.length > 0 ? (
                        <div className="text-xl max-w-2xl mt-16 mb-16">
                            <div className="mb-6">Converted text</div>
                            <div className="text-green-600 leading-relaxed">{generatedText}</div>
                        </div>
                    ) : null
                }
            </div>
        );

}

export default MobileReader;
