import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, panic: false };

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

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
