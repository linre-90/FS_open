import React, { useEffect, useState } from "react";
import userService from "./services/users";
import User from "./components/User";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const x = async () => {
            const response = await userService.getUsers();
            setUsers(response);
        };
        x();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <h5>Blogs created</h5>
            {users.map((user) => (
                <User
                    key={user.name + users.indexOf(user)}
                    name={user.name}
                    userid={user.id}
                    blogs={user.blogs}
                ></User>
            ))}
        </div>
    );
};

export default Users;
