import React, {useState} from "react";
import useImageReader from "../hooks/useImageReader";
import BasicButton from "../components/BasicButton";

export default function ImageURL() {
    const {isConverting, readImageFromURL} = useImageReader()
    const [generatedText, setGeneratedText] = useState('');
    const [imageURL, setImageURL] = useState('');

    const convertImage = async () => {
        updateGeneratedText(await readImageFromURL(imageURL));
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

            <BasicButton isDisabled={isConverting || !imageURL} action={convertImage}  title="Convert"/>

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

            <hr className="bg-blue-900 pb-0.5 mt-8"/>

            <div className="text-lg mt-4">
                <div className="text-lg font-bold">
                    Some sample image URLs
                </div>
                <div className="flex-col flex">
                    <a className="text-blue-600 underline pt-2" rel="noreferrer" target="_blank"
                       href="https://tesseract.projectnaptha.com/img/eng_bw.png">Sample
                        1</a>
                    <a className="text-blue-600 underline pt-2"
                       rel="noreferrer"
                       target="_blank"
                       href="https://study.com/cimages/videopreview/atmosphere-in-literature-definition-examples-and-quiz_114904.jpg">Sample
                        2</a>
                    <a className="text-blue-600 underline pt-2"
                       rel="noreferrer"
                       target="_blank"
                       href="https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/CTRL-examples.png">Sample
                        3</a>
                </div>
            </div>


            {
                generatedText.length > 0 ?
                    <hr className="bg-blue-900 pb-0.5 mt-8 mb-4"/>
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
    )
}