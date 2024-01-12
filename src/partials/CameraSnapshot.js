import React, {useState} from 'react';
import useCamera from "../hooks/useCamera";
import useImageReader from "../hooks/useImageReader";
import BasicButton from "../components/BasicButton";

const CameraSnapshot = () => {
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
                    <BasicButton action={startCamera}  title="Start Camera"/>
                    :
                    <div className="flex gap-3 text-white">
                        <BasicButton action={closeCamera} title="Close Camera" cssClasses="bg-red-600" />

                        <BasicButton action={takeSnapshot} title="Take a Snapshot" cssClasses="bg-green-700" />

                        <BasicButton isDisabled={isConverting || !outputImageURL} action={convert} title="Convert"/>
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

export default CameraSnapshot;
