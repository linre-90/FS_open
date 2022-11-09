import React, { useRef } from "react";
import Blog from "./components/Blog";
import { CreateBlog } from "./components/CreateBlog";
import { Toggleable } from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimer } from "./reducers/messageReducer";
import {
    createNewBlogDispatch,
    updateLikesDispatch,
    deleteBlogDispatch,
} from "./reducers/blogReducer";

const Home = () => {
    const newBlogRef = useRef();
    const dispatch = useDispatch();
    //blog
    const blogsStore = useSelector((state) => state.blog);

    // Post new blog
    const createNewBlog = async (blog) => {
        newBlogRef.current.toggleVisibility();
        try {
            dispatch(createNewBlogDispatch(blog));
            dispatch(
                setNotificationWithTimer(
                    `A new blog ${blog.title} by ${blog.author} added`,
                    false
                )
            );
        } catch (error) {
            setNotificationWithTimer("Adding blog failed", true);
        }
    };

    // Update likes
    const updateLikes = async (blog) => {
        try {
            let updatedBlog = { ...blog };
            updatedBlog.likes += 1;
            updatedBlog.user = blog.user.id;
            dispatch(updateLikesDispatch(updatedBlog));
            dispatch(
                setNotificationWithTimer(
                    `A blog ${blog.title} by ${blog.author} updated`,
                    false
                )
            );
        } catch (error) {
            dispatch(setNotificationWithTimer("updating blog failed", true));
        }
    };

    const deleteBlog = async (blogid) => {
        try {
            dispatch(deleteBlogDispatch(blogid));
            dispatch(
                setNotificationWithTimer("A blog deleted succesfully", false)
            );
        } catch (error) {
            dispatch(setNotificationWithTimer("Deleting blog failed", true));
        }
    };

    return (
        <div>
            <Toggleable buttonLabel={"Create new blog"} ref={newBlogRef}>
                <CreateBlog createBlog={createNewBlog} />
            </Toggleable>
            {/* Show blogs */}
            {blogsStore.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLikeUpdate={updateLikes}
                    handleDelete={deleteBlog}
                />
            ))}
        </div>
    );
};

export default Home;
