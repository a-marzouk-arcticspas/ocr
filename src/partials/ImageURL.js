import React, {useState} from "react";
import useTesseractImageConverter from "../hooks/useTesseractImageConverter";
import BasicButton from "../components/BasicButton";
import useAwsTextractImageConverter from "../hooks/useAwsTextractImageConverter";
import GeneratedTextView from "../components/GeneratedTextView";

export default function ImageURL({activeAPI = "tesseract"}) {
    const {convertImageToText: tesseractConvert, isConverting: isTesseractConverting} = useTesseractImageConverter();
    const {convertImageToText: awsTextractConvert, isConverting: isAwsTextractConverting} = useAwsTextractImageConverter();
    const [generatedText, setGeneratedText] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const convert = async () => {

        const result =  activeAPI === 'tesseract' ? await tesseractConvert(imageURL) : await awsTextractConvert(imageURL);

        updateGeneratedText(result);
    }

    const updateGeneratedText = (text) => {
        setGeneratedText(text);
    };
    const handleURLInput = (inputURL) => {
        setImageURL(inputURL.target.value);
    }

    return (
        <div>
            <div className="text-lg font-bold">
                Please insert image url
            </div>

            <input
                className="mt-4 pl-2 rounded w-full mb-6 pb-1 text-black max-w-2xl"
                type="text"
                placeholder="https://"
                onChange={handleURLInput}
            />

            <BasicButton isDisabled={isTesseractConverting || isAwsTextractConverting || !imageURL} action={convert}  title="Convert"/>

            <div>
                {imageURL ? (
                    <div>
                        <img
                            src={imageURL}
                            alt="Preview"
                            className="max-w-full mt-8 rounded-2xl m-auto"
                        />
                    </div>
                ) : null}
            </div>

            <GeneratedTextView text={generatedText} />
        </div>
    )
}