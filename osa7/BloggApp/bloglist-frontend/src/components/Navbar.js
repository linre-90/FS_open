import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ handleLogout }) => {
    const reduxUser = useSelector((state) => state.user);

    return (
        <div>
            <Link style={{ margin: "10px" }} to={"/"}>
                home
            </Link>
            <Link style={{ margin: "10px" }} to={"/users"}>
                users
            </Link>
            <p style={{ display: "inline-block" }}>
                {reduxUser.name} logged in <br></br>
            </p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Navbar;
