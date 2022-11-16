import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, panic: false };

// Store timer to control it in multiple repeated click situations.
let timerId;

/**
 * Slice that handles message related state updates.
 */
const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage(state, action) {
            const message = {
                message: action.payload[0],
                panic: action.payload[1],
            };
            return message;
        },
    },
});

// Async state update that sets notification with timer.
export const setNotificationWithTimer = (message, panic) => {
    return async (dispatch) => {
        dispatch(setMessage([message, panic]));
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            dispatch(setMessage([null, false]));
        }, 3000);
    };
};

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
