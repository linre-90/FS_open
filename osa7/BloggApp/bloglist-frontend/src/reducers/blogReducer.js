import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

// Reducer slice
const blogReducer = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        createBlog(state, action) {
            state.push(action.payload);
        },
        updateLikes(state, action) {
            return state.map((x) =>
                x.id !== action.payload.id ? x : action.payload
            );
        },
        deleteBlog(state, action) {
            return state.filter((x) => {
                return x.id !== action.payload;
            });
        },
    },
});

// Async state update that fetches initial state from db.
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

// Async state update that dispatches createBlog reducer.
export const createNewBlogDispatch = (newBlog) => {
    return async (dispatch) => {
        const blog = await blogService.create(newBlog);
        dispatch(createBlog(blog));
    };
};

// Async state update that is poorly named. Should be simply update.
// Can be used to update blog post in db and store.
export const updateLikesDispatch = (blogToupdate) => {
    return async (dispatch) => {
        const blog = await blogService.update(blogToupdate);
        dispatch(updateLikes(blog));
    };
};

// Async state update that deletes blog from store and database.
export const deleteBlogDispatch = (blogId) => {
    return async (dispatch) => {
        await blogService.deleteBlog(blogId);
        dispatch(deleteBlog(blogId));
    };
};

export const { setBlogs, createBlog, updateLikes, deleteBlog } =
    blogReducer.actions;
export default blogReducer.reducer;
