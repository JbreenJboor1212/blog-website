import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./postDetails.css";
import { toast } from "react-toastify";
import AddComments from "../../components/comments/AddComments";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdateModelPost from "./UpdateModelPost";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePost,
    getPostById,
    toggleLikesPost,
    updatePostImage,
} from "../../redux/apiCalls/postsApiCall";

const PostDetails = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const nav = useNavigate();

    const { post } = useSelector((state) => state.post);

    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getPostById(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    //^ Update Image Submit Handler
    const updateImageSubmitHandler = (e) => {
        e.preventDefault();

        if (!file) return toast.warning("There is no file!!");

        const dataForm = new FormData();

        dataForm.append("image", file);

        dispatch(updatePostImage(dataForm, id));
    };

    //^ Delete Post Handler
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deletePost(post?._id));
                nav(`/profile/${user?._id}`);
            }
        });
    };

    return (
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img
                    src={file ? URL.createObjectURL(file) : post?.image.url}
                    alt=""
                    className="post-details-image"
                />
                {user?._id === post?.user?._id && (
                    <form
                        className="update-post-image-form"
                        onSubmit={updateImageSubmitHandler}
                    >
                        <label htmlFor="file" className="update-post-label">
                            <i className="bi bi-image-fill"></i>
                            Select new image
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit">Upload</button>
                    </form>
                )}
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img
                    src={post?.user?.profilePhoto?.url}
                    alt=""
                    className="post-details-user-image"
                />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex vitae
                accusamus unde nam est voluptatum quis exercitationem excepturi
                doloribus, totam maiores voluptas eligendi sint et possimus, beatae,
                incidunt labore in. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Ex vitae accusamus unde nam est voluptatum quis exercitationem
                excepturi doloribus, totam maiores voluptas eligendi sint et possimus,
                beatae, incidunt labore in.
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {user && (
                        <i
                            onClick={() => dispatch(toggleLikesPost(post?._id))}
                            className={
                                post?.likes.includes(user?._id)
                                    ? "bi bi-hand-thumbs-up-fill"
                                    : "bi bi-hand-thumbs-up"
                            }
                        ></i>
                    )}
                    <small>{post?.likes.length} Likes</small>
                </div>
                {user?._id === post?.user?._id && (
                    <div>
                        <i
                            className="bi bi-pencil-square"
                            onClick={() => setOpen(true)}
                        ></i>
                        <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
                    </div>
                )}
            </div>
            {user ? (
                <AddComments postId={post?._id} />
            ) : (
                <p className="post-details-info-write">To write a comment you should login first</p>
            )}
            <CommentList comments={post?.comments} />
            {open && <UpdateModelPost post={post} setOpen={setOpen} />}
        </section>
    );
};

export default PostDetails;
