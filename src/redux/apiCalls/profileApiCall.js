import request from "../../utils/request";
import { toast } from "react-toastify"
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";

//^ Go To Profile User
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(data))
            dispatch(profileActions.clearLoading())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

//^ Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(profileActions.setProfilePhoto(data.profilePhoto))
            dispatch(authActions.setUserPhoto(data.profilePhoto))
            toast.success(data.message)

            /* ^ Modify the user in local storage with new photo */
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto
            localStorage.setItem("userInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

//^ Upload Profile
export function uploadProfile(profileId, profileData) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/users/profile/${profileId}`, profileData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.updateProfile(data))
            dispatch(authActions.setUsername(data.username))

            /* ^ Modify the user in local storage with new username */
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username
            localStorage.setItem("userInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

//^ Delete Profile
export function deleteProfileUser(profileId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())

            const { data } = await request.delete(`/api/users/profile/${profileId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileActions.setIsProfileDeleted());

            toast.success(data?.message)

            setTimeout(() => {
                dispatch(profileActions.clearIsProfileDeleted());
            }, 2000)

        } catch (error) {
            toast.error(error.response.data.message)

            dispatch(profileActions.clearLoading());
        }
    }
}

//^ Get All Profiles
export function getAllProfiles() {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())

            const { data } = await request.get(`/api/users/profile`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileActions.setProfiles(data));

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


//^ Get Profile Count
export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())

            const { data } = await request.get(`/api/users/count`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileActions.setUsersCount(data));

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}