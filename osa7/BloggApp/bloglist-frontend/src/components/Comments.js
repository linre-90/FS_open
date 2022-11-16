import React, { useState } from "react";

/**
 * Component display blog post comments.
 */
const Comments = ({ comments, addComment }) => {
    // Comment controlled input state.
    const [comment, setComment] = useState("");

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div>
            <h3>Comments</h3>
            <input
                type="text"
                placeholder="Make new comment"
                onChange={handleChange}
                value={comment}
            ></input>
            <button onClick={() => addComment(comment)}>Add comment</button>
            <ul>
                {comments.map((comment) => {
                    return <li key={comment}>{comment}</li>;
                })}
            </ul>
        </div>
    );
};

export default Comments;
