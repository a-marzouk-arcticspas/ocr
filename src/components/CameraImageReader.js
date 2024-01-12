import React, {useState} from 'react';
import useCamera from "../hooks/useCamera";
import useImageReader from "../hooks/useImageReader";

const CameraImageReader = () => {
    const [generatedText, setGeneratedText] = useState('');
    const { isCameraOn, outputImageURL, startCamera, closeCamera, takeSnapshot } = useCamera();
    const {isConverting, readImageFromURL } = useImageReader()

    const convert = async () => {
        closeCamera();
        setGeneratedText(await readImageFromURL(outputImageURL));
    }

    return (
        <div>
            <div>
                {!isCameraOn ?
                    <button onClick={startCamera}
                            className="disabled:bg-gray-400 bg-blue-900 px-4 py-2 rounded mb-6">
                        Open Camera
                    </button>
                    :
                    <div className="flex gap-3 justify-center">
                        <button onClick={closeCamera}
                                className="disabled:bg-gray-400 bg-blue-900 px-4 py-2 rounded mb-6 mt-6">
                            Close Camera
                        </button>
                        <button onClick={takeSnapshot}
                                className="disabled:bg-gray-400 bg-green-900 px-4 py-2 rounded mb-6 mt-6">
                            Take a snapshot
                        </button>
                        <button onClick={convert} disabled={!outputImageURL || isConverting}
                                className="disabled:bg-gray-400 bg-green-900 px-4 py-2 rounded mb-6 mt-6">
                            Convert
                        </button>
                    </div>

                }
            </div>

            <div className="flex flex-col justify-center items-center">
            <div id="cameraPlaceHolder"></div>
                <div id="canvasPlaceHolder" className="mt-8"></div>
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
};

export default CameraImageReader;
