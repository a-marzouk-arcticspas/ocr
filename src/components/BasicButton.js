import React from 'react';

const BasicButton = ({ isDisabled = false, action, title, cssClasses = ""}) => {
    const buttonClasses = "disabled:bg-gray-400 text-white bg-blue-500 px-4 py-2 rounded " + cssClasses ;

    return (
        <div>
            <button
                disabled={isDisabled}
                onClick={action}
                className={buttonClasses}
            >
                {title}
            </button>
        </div>
    );
};

export default BasicButton;
