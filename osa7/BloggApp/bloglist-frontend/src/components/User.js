import React from "react";

const User = ({ name, blogs, userid }) => {
    return (
        <div>
            <a href={"/users/" + userid}>{name}</a>
            <p>{blogs.length}</p>
        </div>
    );
};

export default User;
