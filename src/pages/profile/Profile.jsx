import React, { useEffect, useState } from "react";
import "./profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateModelProfile from "./UpdateProfileModel";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteProfileUser,
    getUserProfile,
    uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import {
    logoutUser
} from "../../redux/apiCalls/authApiCall";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { Oval } from "react-loader-spinner"

const Profile = () => {
    const dispatch = useDispatch();

    const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    const [file, setFile] = useState(null);

    const [open, setOpen] = useState(false);

    const { id } = useParams();

    const nav = useNavigate()

    useEffect(() => {
        dispatch(getUserProfile(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    useEffect(() => {
        if (isProfileDeleted) {
            nav("/")
        }
    }, [isProfileDeleted, nav]);

    //^ Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!file) return toast.error("The File Is Empty!!");

        const formData = new FormData();

        formData.append("image", file);

        dispatch(uploadProfilePhoto(formData));
    };

    //^ Delete Account Handler
    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteProfileUser(user._id));
                dispatch(logoutUser());
            }
        });
    };

    if (loading) {
        return (
            <div className="profile-loader">
                <Oval
                    height={120}
                    width={120}
                    color="#000"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="gray"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        )
    }

    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
                        alt=""
                        className="profile-image"
                    />
                    {user?._id === profile?._id && (
                        <form onSubmit={formSubmitHandler}>
                            <abbr title="Choose Profile Photo">
                                <label
                                    htmlFor="file"
                                    className="bi bi-camera-fill upload-profile-photo-icon"
                                ></label>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button className="upload-profile-photo-btn" type="submit">
                                    upload
                                </button>
                            </abbr>
                        </form>
                    )}
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">{profile?.bio}</p>
                <div className="user-date-joined">
                    <strong>Date Joined : </strong>
                    <span> {new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {user?._id === profile?._id && <button className="profile-update-btn" onClick={() => setOpen(true)}>
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>}
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-post-list-title">{profile?.username} Posts:</h2>
                {profile?.posts?.map((post) => (
                    <PostItem
                        key={post._id}
                        post={post}
                        username={profile?.username}
                        userId={profile?._id}
                    />
                ))}
            </div>
            {user?._id === profile?._id && <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete Your Account
            </button>}
            {open && <UpdateModelProfile setOpen={setOpen} profile={profile} />}
        </section>
    );
};

export default Profile;
