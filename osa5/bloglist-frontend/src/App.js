import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginservice from "./services/login";
import { Message } from "./components/Message";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // new blog stuff
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    // notification
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);

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
            //console.log(error);
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    // Post new blog
    const createNewBlog = async (event) => {
        try {
            event.preventDefault();
            const response = await blogService.create({ title, url, author });
            setTitle("");
            setAuthor("");
            setUrl("");
            setMessage(
                `A new blog ${response.title} by ${response.author} added`
            );
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (error) {
            //console.log(error);
            setErrorMessage("Adding blog failed");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("bloguser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    if (user === null) {
        return (

            
            <div>
                <h1>Log in to application</h1>

                {/* Notification */}
                {errorMessage !== null && (
                    <Message message={errorMessage} panic={true} />
                )}

                {message !== null && (
                    <Message message={message} panic={false} />
                )}

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            {/* Notification */}
            <h2>blogs</h2>

            {/* Notification */}
            {errorMessage !== null && (
                <Message message={message} panic={true} />
            )}

            {message !== null && <Message message={message} panic={false} />}

            <p>
                {user.name} logged in <button onClick={logout}>logout</button>
            </p>

            {/* Create new blog */}
            <h2>Create new</h2>
            <form onSubmit={createNewBlog}>
                <div>
                    title:
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit">save</button>
            </form>

            {/* Show blogs */}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
