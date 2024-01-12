import React, {useEffect, useState, useRef} from "react";
import Tesseract from 'tesseract.js';
import useImageReader from "../hooks/useImageReader";
export default function ImageReader() {
    const {isConverting, readImageFromURL } = useImageReader()
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
            <div className="mt-16">
                Please insert your image url and click convert.
            </div>

            <input className="mt-4 pl-2 rounded w-full mb-16 pb-1 text-black max-w-2xl" type="text"
                   placeholder="Insert an image url here" onChange={handleURLInput}/>

            <div>
                <button disabled={isConverting} onClick={convertImage} className="disabled:bg-gray-400 bg-blue-500 px-4 py-2 rounded">
                    Convert
                </button>
            </div>

            <div className="text-lg mt-4">
                Sample images:
                <div className="flex-col flex">
                    <a className="text-sky-400 pt-2" rel="noreferrer" target="_blank"
                       href="https://tesseract.projectnaptha.com/img/eng_bw.png">Sample
                        1</a>
                    <a className="text-sky-400"
                       rel="noreferrer"
                       target="_blank"
                       href="https://study.com/cimages/videopreview/atmosphere-in-literature-definition-examples-and-quiz_114904.jpg">Sample
                        2</a>
                    <a className="text-sky-400"
                       rel="noreferrer"
                       target="_blank"
                       href="https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/CTRL-examples.png">Sample
                        3</a>
                </div>
            </div>

            <div>
                {imageURL ? (
                    <div>
                        <img
                            src={imageURL}
                            alt="Preview"
                            className="max-w-xl lg:max-w-2xl mt-4 rounded-2xl m-auto"
                        />
                    </div>
                ): null}
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
    )
}