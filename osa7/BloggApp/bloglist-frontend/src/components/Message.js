import React from "react";
import { Alert } from "@mui/material";

/**
 * Component to display application state for user.
 * Success messages or error messages.
 * @param {*} param0
 */
const Message = ({ message, panic }) => {
    // normal style
    let severity = "success";

    // Error style overwrite
    if (panic) {
        severity = "error";
    }

    return <Alert severity={severity}>{message}</Alert>;
};

export { Message };
