import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    updateLikesDispatch,
    deleteBlogDispatch,
} from "../reducers/blogReducer";
import { setNotificationWithTimer } from "../reducers/messageReducer";

const Blog = () => {
    const id = useParams().id;
    const [blogState, setBlogState] = useState(null);
    const navigate = useNavigate();
    const blog = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    useEffect(() => {
        setBlogState(blog.filter((x) => x.id === id)[0]);
    }, [blog]);

    // Send updated blog to server and update state after.
    const update = async () => {
        try {
            let updatedBlog = { ...blogState };
            updatedBlog.likes += 1;
            updatedBlog.user = blogState.user.id;
            await dispatch(updateLikesDispatch(updatedBlog));
            dispatch(
                setNotificationWithTimer(
                    `A blog ${blogState.title} by ${blogState.author} updated`,
                    false
                )
            );
        } catch (error) {
            dispatch(setNotificationWithTimer("updating blog failed", true));
        }
    };

    // Handles delete
    const deleteBlog = async () => {
        if (
            window.confirm(
                `Remove blog ${blogState.title} by ${blogState.author}`
            )
        ) {
            try {
                await dispatch(deleteBlogDispatch(blogState.id));
                dispatch(
                    setNotificationWithTimer(
                        "A blog deleted succesfully",
                        false
                    )
                );
            } catch (error) {
                dispatch(
                    setNotificationWithTimer("Deleting blog failed", true)
                );
            }
            navigate("/");
        }
    };

    return (
        <div>
            {blogState !== null && (
                <>
                    <h3>
                        {blogState.title} {blogState.author}
                    </h3>
                    <a href={blogState.url}>{blogState.url}</a>
                    <div>
                        likes: {blogState.likes ? blogState.likes : 0}
                        <button onClick={update}>Like</button>
                    </div>
                    <p>Added by {blogState.author}</p>
                    <div>
                        <button onClick={deleteBlog}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Blog;
