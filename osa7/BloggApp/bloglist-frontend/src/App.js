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
import SingleUser from "./SingleUser";
import Blog from "./components/Blog";
import {
    Container,
    Input,
    Button,
    Typography,
    InputAdornment,
    AppBar,
    Toolbar,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import { Stack } from "@mui/system";
import EditLocationIcon from "@mui/icons-material/EditLocation";

/**
 * App component handles routing and user related actions{login,logout}.
 */
const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    // notification
    const message = useSelector((state) => state.message);
    // user
    const reduxUser = useSelector((state) => state.user);

    // Perform auto login if browser local storage has correct token.
    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("bloguser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            blogService.setToken(user.token);
            dispatch(setUser(user));
        }
    }, []);

    // Update components on store dispatchs.
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

    // Log user out. Removes token from local storage.
    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    // Served if correct token is not found.
    if (reduxUser === null) {
        return (
            <Container>
                <form onSubmit={handleLogin}>
                    <Stack
                        spacing={{ xs: 2, sm: 2, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="h4"
                            style={{ textAlign: "center" }}
                        >
                            Log in
                        </Typography>
                        <Input
                            autoComplete="current-username"
                            type="text"
                            value={username}
                            //id="username"
                            onChange={({ target }) => setUsername(target.value)}
                            variant="standard"
                            placeholder="Username"
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                        />

                        <Input
                            autoComplete="current-password"
                            type="password"
                            value={password}
                            //id="password"
                            onChange={({ target }) => setPassword(target.value)}
                            variant="standard"
                            placeholder="Password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                        />
                        <Button
                            variant="outlined"
                            id="loginBtn"
                            type="submit"
                            color="success"
                            size="large"
                        >
                            login
                        </Button>
                        {message.message !== null && (
                            <Message
                                message={message.message}
                                panic={message.panic}
                            />
                        )}
                    </Stack>
                </form>
            </Container>
        );
    }

    // Served if user token is found and is valid.
    return (
        <Router>
            <Container>
                <Navbar handleLogout={logout} />
                {/* Notification */}
                {message.message !== null && (
                    <Message message={message.message} panic={message.panic} />
                )}
                <Routes>
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users/:id" element={<SingleUser />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
                <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
                    <Toolbar>
                        {
                            <Typography
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                <EditLocationIcon />
                                Blog app 9000
                                <EditLocationIcon />
                            </Typography>
                        }
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </Container>
        </Router>
    );
};

export default App;
