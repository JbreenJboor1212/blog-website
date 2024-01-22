import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {

    const { comments } = useSelector(state => state.comment)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllComments());
    }, [dispatch])


    //^ Delete Users Handler
    const DeleteCommentsHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comments!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteComment(commentId))
            }
        });
    }

    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments?.map((comment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img
                                            src={comment.user?.profilePhoto?.url}
                                            alt=""
                                            className="table-user-image"
                                        />
                                        <span className="table-username">{comment.user.username}</span>
                                    </div>
                                </td>
                                <td>{comment.text}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={() => DeleteCommentsHandler(comment._id)}>
                                            Delete Comments
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CommentsTable;
