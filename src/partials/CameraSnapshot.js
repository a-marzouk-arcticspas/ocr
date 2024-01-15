import React, {useState} from 'react';
import useCamera from "../hooks/useCamera";
import useTesseractImageConverter from "../hooks/useTesseractImageConverter";
import BasicButton from "../components/BasicButton";
import GeneratedTextView from "../components/GeneratedTextView";
import useAwsTextractImageConverter from "../hooks/useAwsTextractImageConverter";

const CameraSnapshot = ({activeAPI = "tesseract"}) => {
    const {convertImageToText: tesseractConvert, isConverting: isTesseractConverting} = useTesseractImageConverter();
    const {convertImageToText: awsTextractConvert, isConverting: isAwsTextractConverting} = useAwsTextractImageConverter();
    const [generatedText, setGeneratedText] = useState(null);
    const {isCameraOn, outputImageURL, startCamera, closeCamera, takeSnapshot} = useCamera();

    const convert = async () => {
        closeCamera();
        const result = activeAPI === 'tesseract' ? await tesseractConvert(outputImageURL) : await awsTextractConvert(outputImageURL);
        setGeneratedText(result);
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

                        <BasicButton isDisabled={isTesseractConverting || isAwsTextractConverting || !outputImageURL} action={convert} title="Convert"/>
                    </div>

                }
            </div>

            <div className="flex flex-col justify-center items-center mt-8">
                <div id="cameraPlaceHolder" className="rounded-2xl overflow-hidden"></div>
                <div id="canvasPlaceHolder" className="mt-8 rounded-2xl overflow-hidden"></div>
            </div>


            <GeneratedTextView text={generatedText} />

        </div>
    );
};

export default CameraSnapshot;
