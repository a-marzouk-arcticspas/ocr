import React from "react";

const GeneratedTextView = ({text}) => {
    return(
        <div>
            {
                text !== null ?
                    <hr className="bg-blue-900 pb-0.5 mt-8 mb-4 rounded-2xl overflow-hidden"/>
                    : null
            }

            {
                text !== null  ? (
                    <div className="text-xl max-w-2xl mb-16">
                        <div className="mb-2 text-lg font-bold leading-relaxed">Converted text:</div>
                        <div className="text-green-700 font-bold leading-relaxed">
                            {typeof text === 'string' ? text : (
                                text.map( (line) => {
                                    return (
                                        <div className="text-green-700 font-bold leading-relaxed" key={line.Id}>
                                            {line.Text} | <span className="text-blue-600 text-lg">Confidence: {parseFloat(line.Confidence).toFixed(2)}</span>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default GeneratedTextView;
