import {React, useState} from "react";

const CreateBlog = () => {

    // new blog stuff
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

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

    return (
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
    );
};

export {CreateBlog}
