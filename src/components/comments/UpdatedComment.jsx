import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "./updatedComment.css"
import { useDispatch } from 'react-redux';
import { updateComment } from '../../redux/apiCalls/commentApiCall';

const UpdatedComment = ({ setOpen, commentForUpdate }) => {

    const dispatch = useDispatch();

    const [text, setText] = useState(commentForUpdate?.text);


    //^ Updated Comment Handler
    const updatedCommentHandler = (e) => {
        e.preventDefault();
        if (text.trim() === "") return toast.error("Please Write Something")
        dispatch(updateComment(commentForUpdate?._id, { text }))
        setOpen(false);
        window.location.reload()
    }


    return (
        <div className="update-comment">
            <form className="update-comment-form" onSubmit={updatedCommentHandler}>
                <abbr title="close">
                    <i
                        className="bi bi-x-circle-fill update-comment-form-close"
                        onClick={() => setOpen(false)}
                    ></i>
                </abbr>
                <h1 className="update-comment-title">Update Comment</h1>
                <input
                    type="text"
                    className="update-comment-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="update-comment-btn">
                    Edit Comment
                </button>
            </form>
        </div>
    )
}

export default UpdatedComment
