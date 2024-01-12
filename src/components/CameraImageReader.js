import React, {useState} from 'react';
import useCamera from "../hooks/useCamera";
import useImageReader from "../hooks/useImageReader";

const CameraImageReader = () => {
    const [generatedText, setGeneratedText] = useState('');
    const {isCameraOn, outputImageURL, startCamera, closeCamera, takeSnapshot} = useCamera();
    const {isConverting, readImageFromURL} = useImageReader()

    const convert = async () => {
        closeCamera();
        setGeneratedText(await readImageFromURL(outputImageURL));
    }

    return (
        <div>
            <div>
                {!isCameraOn ?
                    <button onClick={startCamera}
                            className="disabled:bg-gray-400 text-white bg-blue-500 px-4 py-2 rounded">
                        Open Camera
                    </button>
                    :
                    <div className="flex gap-3 text-white">
                        <button onClick={closeCamera}
                                className="disabled:bg-gray-400 bg-red-600 px-4 py-2 rounded">
                            Close Camera
                        </button>
                        <button onClick={takeSnapshot}
                                className="disabled:bg-gray-400 bg-green-700 px-4 py-2 rounded">
                            Take a snapshot
                        </button>
                        <button onClick={convert} disabled={!outputImageURL || isConverting}
                                className="disabled:bg-gray-400 bg-green-900 px-4 py-2 rounded">
                            Convert
                        </button>
                    </div>

                }
            </div>

            <div className="flex flex-col justify-center items-center mt-8">
                <div id="cameraPlaceHolder" className="rounded-2xl overflow-hidden"></div>
                <div id="canvasPlaceHolder" className="mt-8 rounded-2xl overflow-hidden"></div>
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
};

export default CameraImageReader;
