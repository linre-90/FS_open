import React from "react";

/**
 * Component to display application state for user.
 * Success messages or error messages.
 * @param {*} param0
 */
const Message = ({ message, panic }) => {
    // normal style
    let style = {
        color: "green",
        border: "1px solid green",
        backgroundColor: "rgba(201, 76, 76, 0.3)",
        padding: "10px",
        borderRadius: "10px",
    };

    // Error style overwrite
    if (panic) {
        style.color = "red";
        style.border = "1px solid red";
    }

    return <h2 style={style}>{message}</h2>;
};

export { Message };
