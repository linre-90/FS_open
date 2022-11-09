import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "../services/blogs";

const blogReducer = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        print(state, action) {
            console.log(action.payload);
            console.log(state);
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await getAll();
        dispatch(print(blogs));
    };
};

export const { print } = blogReducer.actions;
export default blogReducer.reducer;
