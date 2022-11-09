import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginservice from "./services/login";
import { Message } from "./components/Message";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimer } from "./reducers/messageReducer";
import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Home from "./Home";
import Users from "./Users";

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    // notification
    const message = useSelector((state) => state.message);
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
        <Router>
            {/* Notification */}
            <h1>Blogs</h1>
            <Navbar />

            <p>
                {reduxUser.name} logged in <br></br>
                <button onClick={logout}>logout</button>
            </p>
            {/* Notification */}
            {message.message !== null && (
                <Message message={message.message} panic={message.panic} />
            )}
            <Routes>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </Router>
    );
};

export default App;
