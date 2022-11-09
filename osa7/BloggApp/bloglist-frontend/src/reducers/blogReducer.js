import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogReducer = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        createBlog(state, action) {
            state.push(action.payload);
            //return [...state.blog, action.payload];
        },
        updateLikes(state, action) {
            console.log(action.payload);
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createNewBlogDispatch = (newBlog) => {
    return async (dispatch) => {
        const blog = await blogService.create(newBlog);

        dispatch(createBlog(blog));
    };
};

export const updateLikesDispatch = (blogToupdate) => {
    return async (dispatch) => {
        const blog = await blogService.update(blogToupdate);
        dispatch(updateLikes(blog));
    };
};

export const { setBlogs, createBlog, updateLikes } = blogReducer.actions;
export default blogReducer.reducer;
