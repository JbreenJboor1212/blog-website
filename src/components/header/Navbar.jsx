import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ toggle, setToggle }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <nav
            style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            className="navbar"
        >
            <ul className="nav-links">
                <Link
                    to={"/"}
                    className="nav-link"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <i className="bi bi-house"></i> Home
                </Link>
                <Link
                    to={"/posts"}
                    className="nav-link"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <i className="bi bi-stickies"></i> Posts
                </Link>
                {user && (
                    <Link
                        to={"/posts/create-post"}
                        className="nav-link"
                        onClick={() => setToggle((prev) => !prev)}
                    >
                        <i className="bi bi-journal-plus"></i> Create
                    </Link>
                )}
                {user?.isAdmin && (
                    <Link
                        className="nav-link"
                        to={"/admin-dashboard"}
                        onClick={() => setToggle((prev) => !prev)}
                    >
                        <i className="bi bi-person-check"></i> Admin Dashboard
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
