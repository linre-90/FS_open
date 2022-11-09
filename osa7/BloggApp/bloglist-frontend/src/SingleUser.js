import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "./services/users";

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
        <div>
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    <h4>Added blogs</h4>
                    <ul>
                        {user.blogs.map((blog) => (
                            <li key={blog.title + blog.url}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SingleUser;
