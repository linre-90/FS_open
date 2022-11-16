import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    updateLikesDispatch,
    deleteBlogDispatch,
} from "../reducers/blogReducer";
import { setNotificationWithTimer } from "../reducers/messageReducer";
import Comments from "./Comments";

/**
 * Component that renders blog post and handles its updates.
 */
const Blog = () => {
    // blog post id in route
    const id = useParams().id;
    const [blogState, setBlogState] = useState(null);
    const navigate = useNavigate();
    const blog = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    // set state from store.
    useEffect(() => {
        // Filter blog where id is url id.
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

    // Add new comment to blog posting.
    const addCommentToBlog = async (comment) => {
        try {
            // Clone old state, update old state comments, set user and call async redux dispatcher;
            let updatedBlog = { ...blogState };
            updatedBlog.comments = [...updatedBlog.comments, comment];
            updatedBlog.user = blogState.user.id;
            await dispatch(updateLikesDispatch(updatedBlog));
            dispatch(
                setNotificationWithTimer(
                    `A blog ${blogState.title} by ${blogState.author} commented.`,
                    false
                )
            );
        } catch (error) {
            dispatch(setNotificationWithTimer("updating blog failed", true));
        }
    };

    // Handles blog posting deletion. Redirects back to home after succesfull delete.
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
            {blogState && (
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
                    <Comments
                        comments={blogState.comments}
                        addComment={addCommentToBlog}
                    />
                </>
            )}
        </div>
    );
};

export default Blog;
