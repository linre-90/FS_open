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
import {
    Typography,
    Badge,
    IconButton,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

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
                    <Card>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Title
                            </Typography>
                            <Typography variant="h6">
                                {blogState.title}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                URL
                            </Typography>
                            <MaterialLink to={blogState.url} component={Link}>
                                <Typography variant="body1">
                                    {blogState.url}
                                </Typography>
                            </MaterialLink>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Author
                            </Typography>
                            <Typography variant="body1">
                                {blogState.author}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton color="error" onClick={deleteBlog}>
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton
                                style={{ marginLeft: "2rem" }}
                                onClick={update}
                            >
                                <Badge
                                    badgeContent={
                                        blogState.likes ? blogState.likes : 0
                                    }
                                    color="primary"
                                >
                                    <ThumbUpIcon color="action" />
                                </Badge>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Card style={{ marginTop: "2rem" }}>
                        <CardContent>
                            <Comments
                                comments={blogState.comments}
                                addComment={addCommentToBlog}
                            />
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Blog;
