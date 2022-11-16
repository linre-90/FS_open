import { React, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField,
    DialogActions,
    Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * Component to create new blog.
 */
const CreateBlog = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [open, setOpen] = useState(false);

    // Post new blog
    const createNewBlog = async () => {
        const newBlog = { title, url, author };
        setTitle("");
        setAuthor("");
        setUrl("");
        createBlog(newBlog);
        handleClose();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab
                sx={{ position: "fixed", top: "auto", right: 40, bottom: 90 }}
                onClick={handleClickOpen}
                color="primary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create blog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill the fields to create new blog.
                    </DialogContentText>
                    <TextField
                        id="title"
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={({ target }) => setTitle(target.value)}
                        value={title}
                    />
                    <TextField
                        id="author"
                        autoFocus
                        margin="dense"
                        label="Author"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={({ target }) => setAuthor(target.value)}
                        value={author}
                    />
                    <TextField
                        id="url"
                        autoFocus
                        margin="dense"
                        label="Url"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={({ target }) => setUrl(target.value)}
                        value={url}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createNewBlog}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// Prop type validation
CreateBlog.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export { CreateBlog };
