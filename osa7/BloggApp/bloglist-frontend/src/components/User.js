import React from "react";
import { TableRow, TableCell, Link as MaterialLink } from "@mui/material";
import { Link } from "react-router-dom";
/**
 * Displays user and how many posts user has.
 */
const User = ({ name, blogs, userid }) => {
    return (
        <TableRow>
            <TableCell>
                <MaterialLink component={Link} to={"/users/" + userid}>
                    {name}
                </MaterialLink>
            </TableCell>
            <TableCell align="right">{blogs.length}</TableCell>
        </TableRow>
    );
};

export default User;
