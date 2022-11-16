import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "./services/users";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Container } from "@mui/system";
/**
 * Displays single user.
 */
const SingleUser = () => {
    const id = useParams().id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const x = async () => {
            const response = await userService.getUser(id);
            setUser(response);
        };
        x();
    }, []);

    return (
        <Container>
            {user && (
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.name} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <KeyboardArrowDownIcon />
                        </ListItemIcon>
                        <ListItemText secondary="Added blogs" />
                    </ListItem>
                    {user.blogs.map((blog) => (
                        <ListItem key={blog.title + blog.url}>
                            <ListItemIcon>
                                <TextSnippetIcon />
                            </ListItemIcon>
                            <ListItemText primary={blog.title} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default SingleUser;
