import {React, useState} from "react";

const CreateBlog = ({createBlog}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    // Post new blog
    const createNewBlog = async (event) => {
        event.preventDefault();
        const newBlog = {title, url, author }
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
        </>
    );
};

export { CreateBlog }
