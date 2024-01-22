import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { createNewCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("");

    /* Category Submit Handler */
    const CategorySubmitHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Category Title Is Required!!")
        dispatch(createNewCategory({ title }));
        setTitle("")
    }


    return (
        <div className="add-category">
            <h6 className="add-category-title">Add New Category</h6>
            <form className="add-category-form" onSubmit={CategorySubmitHandler}>
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Category Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className="add-category-btn" type="submit">
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategoryForm;
