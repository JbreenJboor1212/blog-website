import React, { useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/apiCalls/categoryApiCall";

const SideBar = () => {

    const dispatch = useDispatch()

    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    return (
        <div className="sidebar">
            <h5 className="sidebar-title">CATEGORIES</h5>
            <ul className="sidebar-links">
                {categories?.map((category) => (
                    <Link className="sidebar-link" to={`/posts/categories/${category?.title}`} key={category?._id}>
                        {category?.title}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
