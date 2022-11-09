import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginservice from "./services/login";
import { Message } from "./components/Message";
import { CreateBlog } from "./components/CreateBlog";
import { Toggleable } from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimer } from "./reducers/messageReducer";
import { setUser } from "./reducers/userReducer";
import {
    initializeBlogs,
    createNewBlogDispatch,
    updateLikesDispatch,
    deleteBlogDispatch,
} from "./reducers/blogReducer";

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const newBlogRef = useRef();
    const dispatch = useDispatch();
    // notification
    const message = useSelector((state) => state.message);
    //blog
    const blogsStore = useSelector((state) => state.blog);
    // user
    const reduxUser = useSelector((state) => state.user);

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("bloguser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            blogService.setToken(user.token);
            dispatch(setUser(user));
        }
    }, []);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    // Handle login btn press.
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginservice.login({ username, password });
            dispatch(setUser(user));
            setUsername("");
            setPassword("");
            blogService.setToken(user.token);

            // save user to local storage
            window.localStorage.setItem("bloguser", JSON.stringify(user));
        } catch (error) {
            dispatch(setNotificationWithTimer("Wrong credentials", true));
        }
    };

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

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    if (reduxUser === null) {
        return (
            <div>
                <h1>Log in to application</h1>
                {/* Notification */}

                {message.message !== null && (
                    <Message message={message.message} panic={message.panic} />
                )}

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            id="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            id="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id="loginBtn" type="submit">
                        login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div>
            {/* Notification */}
            <h2>blogs</h2>

            {/* Notification */}
            {message.message !== null && (
                <Message message={message.message} panic={message.panic} />
            )}

            <p>
                {reduxUser.name} logged in
                <button onClick={logout}>logout</button>
            </p>

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

export default App;
