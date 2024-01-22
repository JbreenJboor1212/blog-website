import React, { useEffect, useState } from "react";
import "./updatePost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postsApiCall";
import { getAllCategory } from "../../redux/apiCalls/categoryApiCall";

const UpdateModelPost = ({ setOpen, post }) => {
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.category);

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [category, setCategory] = useState(post.category);

    //^ Updated Post Handler
    const updatedPostHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post title is required");
        if (description.trim() === "")
            return toast.error("Post description is required");
        if (category.trim() === "") return toast.error("Post category is required");
        dispatch(updatePost({ title, description, category }, post._id));
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    return (
        <div className="update-post">
            <form className="update-post-form" onSubmit={updatedPostHandler}>
                <abbr title="close">
                    <i
                        className="bi bi-x-circle-fill update-post-form-close"
                        onClick={() => setOpen(false)}
                    ></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input
                    type="text"
                    className="update-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="update-post-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories?.map((category) => (
                        <option value={category.title} key={category._id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <textarea
                    className="update-post-textarea"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit" className="update-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdateModelPost;
