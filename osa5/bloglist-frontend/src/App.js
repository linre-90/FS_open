import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginservice from "./services/login";
import { Message } from "./components/Message";
import { CreateBlog } from "./components/CreateBlog";
import { Toggleable } from "./components/Toggleable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const newBlogRef = useRef();

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
    const createNewBlog = async (blog) => {
        newBlogRef.current.toggleVisibility();
        try {
            const response = await blogService.create(blog);
            updateBlogList();
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

    // Update likes
    const updateLikes = async (blog) => {
        try {
            const response = await blogService.update(blog);
            setMessage(
                `A blog ${response.title} by ${response.author} updated`
            );
            setTimeout(() => {
                setMessage(null);
            }, 5000);
            return response;
        } catch (error) {
            //console.log(error);
            setErrorMessage("Adding blog failed");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const deleteBlog = async(blogid) => {
        try {
            const response = await blogService.deleteBlog(blogid);
            updateBlogList();
            setMessage(
                "A blog deleted succesfully"
            );
            setTimeout(() => {
                setMessage(null);
            }, 5000);
            return response;
        } catch (error) {
            console.log(error);
            setErrorMessage("Deleting blog failed");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    const updateBlogList = () => {
        blogService.getAll().then((blogs) => {
            // Sort blogs based on likes top -> bottom
            const sorted = blogs.sort((a,b) => {
                if(a.likes < b.likes){
                    return 1;
                }
                if(a.likes > b.likes){
                    return -1;
                }
                return 0;
            });
            setBlogs(sorted);
        });
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
                    <button id="loginBtn" type="submit">login</button>
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
                <Message message={errorMessage} panic={true} />
            )}

            {message !== null && <Message message={message} panic={false} />}

            <p>
                {user.name} logged in <button onClick={logout}>logout</button>
            </p>


            <Toggleable buttonLabel={"Create new blog"} ref={newBlogRef} >
                <CreateBlog createBlog={createNewBlog}/>
            </Toggleable>
            {/* Show blogs */}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} handleLikeUpdate={updateLikes} handleDelete={deleteBlog}/>
            ))}
        </div>
    );
};

export default App;
