import React, { useState } from "react";
import "./addComments.css";
import { toast } from "react-toastify";
import { createComment } from "../../redux/apiCalls/commentApiCall";
const { useDispatch } = require("react-redux")

const AddComments = ({ postId }) => {
    const dispatch = useDispatch()

    const [text, setText] = useState("");

    const formSubmitCommentHandler = (e) => {

        e.preventDefault();

        if (text.trim() === "") return toast.error("Please write a comment");

        dispatch(createComment({ text, postId }))

        setText("")
    };


    return (
        <form onSubmit={formSubmitCommentHandler} className="add-comment">
            <input
                type="text"
                placeholder="add comment"
                className="add-comment-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-comment-btn">
                Add Comment
            </button>
        </form>
    );
};

export default AddComments;
