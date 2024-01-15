import React from 'react';

const RadioGroup = ({ options, selectedOption, handleRadioChange, title, name}) => {
    return (
        <div>
            <div className="text-lg font-bold"> {title} </div>

            <div className="mt-2 mb-8">
                {options.map((option) => (
                    <div key={option.id} className="flex gap-3 items-center text-xl">
                        <input
                            type="radio"
                            id={option.id}
                            name={name}
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor={option.id}> {option.label}</label>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default RadioGroup;
