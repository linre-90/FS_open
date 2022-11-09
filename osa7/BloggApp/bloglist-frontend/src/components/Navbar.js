import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link style={{ margin: "10px" }} to={"/"}>
                home
            </Link>
            <Link style={{ margin: "10px" }} to={"/users"}>
                users
            </Link>
        </div>
    );
};

export default Navbar;
