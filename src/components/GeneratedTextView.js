import React from "react";
import Divider from "./Divider";

const GeneratedTextView = ({text}) => {
    return (
        text !== null ? (
            <div>
                <Divider cssClasses="mt-8 mb-4"/>

                <div className="text-xl max-w-2xl mb-16">
                    <div className="mb-2 text-lg font-bold leading-relaxed">Converted text:</div>
                    <div className="text-green-700 font-bold leading-relaxed">
                        {typeof text === 'string' ? text : (
                            text.map((line) => {
                                return (
                                    <div className="text-green-700 font-bold leading-relaxed" key={line.Id}>
                                        {line.Text} | <span
                                        className="text-blue-600 text-lg">Confidence: {parseFloat(line.Confidence).toFixed(2)}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default GeneratedTextView;
