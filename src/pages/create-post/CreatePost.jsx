import React, { useEffect, useState } from "react";
import "./createPost.css";
import { toast } from "react-toastify";
import { createANewPost } from "../../redux/apiCalls/postsApiCall";
import { getAllCategory } from "../../redux/apiCalls/categoryApiCall";
const { useDispatch, useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");
const { RotatingLines } = require("react-loader-spinner");

const CreatePost = () => {
    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector((state) => state.post);
    const { categories } = useSelector((state) => state.category);

    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);

    //^ Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post title is required");
        if (description.trim() === "")
            return toast.error("Post description is required");
        if (category.trim() === "") return toast.error("Post category is required");
        if (!file) return toast.error("Post Image is required");
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        //TODO: Send From Data To Server
        dispatch(createANewPost(formData));
    };

    useEffect(() => {
        if (isPostCreated) {
            nav("/");
        }
    }, [isPostCreated, nav]);

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    return (
        <section className="create-post">
            <h1 className="create-post-title">Create New Post</h1>
            <form className="create-post-form" onSubmit={formSubmitHandler}>
                <input
                    type="text"
                    placeholder="Post Title"
                    className="create-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="create-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Select A Category
                    </option>
                    {categories?.map((category) => (
                        <option value={category.title} key={category._id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <textarea
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Post Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" className="create-post-btn">
                    {loading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="30"
                            visible={true}
                        />
                    ) : (
                        "Create"
                    )}
                </button>
            </form>
        </section>
    );
};

export default CreatePost;
