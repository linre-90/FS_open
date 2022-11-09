import { React, useState } from "react";
import PropTypes from "prop-types";

const CreateBlog = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    // Post new blog
    const createNewBlog = async (event) => {
        event.preventDefault();
        const newBlog = { title, url, author };
        setTitle("");
        setAuthor("");
        setUrl("");
        createBlog(newBlog);
    };

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={createNewBlog}>
                <div>
                    title:
                    <input
                        id="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="submitBlog" type="submit">
                    save
                </button>
            </form>
        </>
    );
};

CreateBlog.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export { CreateBlog };
