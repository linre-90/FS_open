import React, { useRef } from "react";
import { CreateBlog } from "./components/CreateBlog";
import { Toggleable } from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimer } from "./reducers/messageReducer";
import { createNewBlogDispatch } from "./reducers/blogReducer";
import { Link } from "react-router-dom";

/**
 * Applications main front page.
 * Displays listing of blogs and provides new blog creation function.
 */
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

    return (
        <div>
            <Toggleable buttonLabel={"Create new"} ref={newBlogRef}>
                <CreateBlog createBlog={createNewBlog} />
            </Toggleable>
            {/* Show blogs */}
            {blogsStore.map((blog) => (
                <Link
                    style={{ display: "block" }}
                    to={`/blogs/${blog.id}`}
                    key={blog.id}
                >
                    {blog.title}
                </Link>
            ))}
        </div>
    );
};

export default Home;
