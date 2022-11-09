import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginservice from "./services/login";
import { Message } from "./components/Message";
import { CreateBlog } from "./components/CreateBlog";
import { Toggleable } from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "./reducers/messageReducer";

let timer;

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const newBlogRef = useRef();

    // notification
    //const [message, setMessage] = useState(null);
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();

    // Handle login btn press.
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginservice.login({ username, password });
            setUser(user);
            setUsername("");
            setPassword("");
            blogService.setToken(user.token);

            // save user to local storage
            window.localStorage.setItem("bloguser", JSON.stringify(user));
        } catch (error) {
            dispatch(setMessage(["Wrong credentials", true]));
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
        }
    };

    // Post new blog
    const createNewBlog = async (blog) => {
        newBlogRef.current.toggleVisibility();
        try {
            const response = await blogService.create(blog);
            await updateBlogList();
            dispatch(
                setMessage([
                    `A new blog ${response.title} by ${response.author} added`,
                    false,
                ])
            );
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
        } catch (error) {
            clearTimeout(timer);
            setMessage(["Adding blog failed", true]);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
        }
    };

    // Update likes
    const updateLikes = async (blog) => {
        try {
            const response = await blogService.update(blog);
            await updateBlogList();
            dispatch(
                setMessage([
                    `A blog ${response.title} by ${response.author} updated`,
                    false,
                ])
            );
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
            return response;
        } catch (error) {
            dispatch(setMessage(["Adding blog failed", true]));
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
        }
    };

    const deleteBlog = async (blogid) => {
        try {
            const response = await blogService.deleteBlog(blogid);
            await updateBlogList();
            dispatch(setMessage(["A blog deleted succesfully", false]));
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
            return response;
        } catch (error) {
            dispatch(setMessage(["Deleting blog failed", true]));
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(setMessage([null, false]));
            }, 5000);
        }
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    const sortBlogs = (blogs) => {
        const sorted = blogs.sort((a, b) => {
            if (a.likes < b.likes || a.likes === undefined) {
                return 1;
            }
            if (b.likes < a.likes || b.likes === undefined) {
                return -1;
            }
            return 0;
        });
        return sorted;
    };

    const updateBlogList = async () => {
        const blogs = await blogService.getAll();
        setBlogs(sortBlogs(blogs));
    };

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("bloguser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        updateBlogList();
    }, []);

    if (user === null) {
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
                {user.name} logged in <button onClick={logout}>logout</button>
            </p>

            <Toggleable buttonLabel={"Create new blog"} ref={newBlogRef}>
                <CreateBlog createBlog={createNewBlog} />
            </Toggleable>
            {/* Show blogs */}
            {blogs.map((blog) => (
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
