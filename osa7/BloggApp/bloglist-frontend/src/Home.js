import React from "react";
import { CreateBlog } from "./components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimer } from "./reducers/messageReducer";
import { createNewBlogDispatch } from "./reducers/blogReducer";
import { Link } from "react-router-dom";
import {
    Card,
    Typography,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import { Stack } from "@mui/system";
/**
 * Applications main front page.
 * Displays listing of blogs and provides new blog creation function.
 */
const Home = () => {
    const dispatch = useDispatch();
    //blog
    const blogsStore = useSelector((state) => state.blog);

    // Post new blog
    const createNewBlog = async (blog) => {
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
            <CreateBlog createBlog={createNewBlog} />
            <Stack spacing={{ xs: 2, sm: 2, md: 4 }}>
                {/* Show blogs */}
                {blogsStore.map((blog) => (
                    <Card
                        variant="outlined"
                        key={blog.id}
                        sx={{ minWidth: 275 }}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                By: {blog.author}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                LinkComponent={Link}
                                to={`/blogs/${blog.id}`}
                                size="small"
                            >
                                Open
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </div>
    );
};

export default Home;
