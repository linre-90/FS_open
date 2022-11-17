import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { setNotificationWithTimer } from "../reducers/messageReducer";
import { useDispatch } from "react-redux";

/**
 * Component display blog post comments.
 */
const Comments = ({ comments, addComment }) => {
    // Comment controlled input state.
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = () => {
        if (comment.length < 15) {
            dispatch(
                setNotificationWithTimer(
                    "Comment too short, minimum 16 Characters.",
                    true
                )
            );
            return;
        }
        setComment("");
        addComment(comment);
    };

    return (
        <div>
            <Typography variant="body1">Comment</Typography>
            <TextField
                fullWidth
                type="text"
                placeholder="Make new comment"
                onChange={handleChange}
                value={comment}
                multiline={true}
                rows={5}
                cols={10}
            ></TextField>
            <Button
                variant="outlined"
                color="success"
                onClick={submitComment}
                style={{ marginBottom: "2rem" }}
            >
                Add
            </Button>
            <Typography variant="body1">Comments</Typography>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment + comments.indexOf(comment)}>
                            {comment}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Comments;
