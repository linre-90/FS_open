import React from "react";

/**
 * Displays user and how many posts user has.
 */
const User = ({ name, blogs, userid }) => {
    return (
        <div>
            <a href={"/users/" + userid}>{name}</a>
            <p>{blogs.length}</p>
        </div>
    );
};

export default User;
