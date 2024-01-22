import React, { useState } from "react";
import "./updateProfileModel.css";
import { useDispatch } from "react-redux";
import { uploadProfile } from "../../redux/apiCalls/profileApiCall";




const UpdateModelProfile = ({ setOpen, profile }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(profile?.username);
    const [bio, setBio] = useState(profile?.bio);
    const [password, setPassword] = useState("");

    //^ Updated Profile Handler
    const updatedProfileHandler = (e) => {
        e.preventDefault();

        const updatedUser = { username, bio }

        if (password.trim() !== "") {
            updatedUser.password = password
        }

        dispatch(uploadProfile(profile?._id, updatedUser))

        setOpen(false)
    }

    return (
        <div className="update-profile">
            <form className="update-profile-form" onSubmit={updatedProfileHandler}>
                <abbr title="close">
                    <i
                        className="bi bi-x-circle-fill update-profile-form-close"
                        onClick={() => setOpen(false)}
                    ></i>
                </abbr>
                <h1 className="update-profile-title">Update Your Profile</h1>
                <input
                    type="text"
                    className="update-profile-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="text"
                    className="update-profile-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                />
                <input
                    type="password"
                    className="update-profile-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" className="update-post-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateModelProfile;
