import React, { useEffect, useState } from "react";
import userService from "./services/users";
import User from "./components/User";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";

/**
 * Shows listing of all users.
 */
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
            <Typography style={{ marginTop: "2rem" }} variant="h5">
                Users and blogs
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <User
                                key={user.name + users.indexOf(user)}
                                name={user.name}
                                userid={user.id}
                                blogs={user.blogs}
                            ></User>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;
