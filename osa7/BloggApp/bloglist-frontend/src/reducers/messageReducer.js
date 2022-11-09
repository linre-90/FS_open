import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, panic: false };

let timerId;

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
