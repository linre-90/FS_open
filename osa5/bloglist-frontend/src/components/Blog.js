import { React, useEffect, useState } from "react";

const Blog = ({ blog, handleLikeUpdate, handleDelete }) => {
    const [display, setDisplay] = useState(false);
    const [blogState, setBlogState] = useState(blog);
    const [updatingLikes, setUpdatingLikes] = useState(true);

    const updateDisplay = () => {
        setDisplay(!display);
    };

    // Send updated blog to server and update state after.
    const update = async() => {
        setUpdatingLikes(true);
        let updatedBlog = blogState;
        updatedBlog.likes = blogState.likes + 1;
        updatedBlog.user = blogState.user.id;
        const responseBlog = await handleLikeUpdate(updatedBlog);
        if(responseBlog){
            setBlogState(responseBlog);
            setUpdatingLikes(false);
        }
    };

    // Handles delete
    const deleteBlog = () => {
        if(window.confirm(`Remove blog ${blogState.title} by ${blogState.author}`)){
            handleDelete(blogState.id);
        }
    };

    // Mark initial render to be complete
    useEffect(() => {
        if(!blogState.likes){
            let newBlogObj = blogState;
            newBlogObj.likes = 0;
            setBlogState(newBlogObj);
        }
        setUpdatingLikes(false);
    },[]);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom:10,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle}>
            <div>
                {blogState.title} {blogState.author}
                {display ? (
                    <button onClick={updateDisplay}>Hide</button>
                ) : (
                    <button onClick={updateDisplay}>View</button>
                )}
            </div>
            {display ? (
                <>
                    <div>{blogState.url}</div>
                    <div>likes: {blogState.likes}{updatingLikes? <></>:<button onClick={update} >Like</button>}</div>
                    <div>{blogState.author}</div>
                    <div><button onClick={deleteBlog} >Delete</button></div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Blog;
