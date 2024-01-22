import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

//^ Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Get Posts Count
export function getPostsCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Fetch Posts Based On Category
export function fetchPostBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCate(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Fetch All Posts
export function fetchAllPosts() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Create New Post
export function createANewPost(newPost) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading());
            await request.post(`/api/posts`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(postActions.setIsPostCreated());
            setTimeout(() => {
                dispatch(postActions.clearIsPostCreated(true));
            }, 2000); //2 second
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(postActions.clearLoading())
        }
    };
}


//^ Get Post By Id
export function getPostById(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Toggle Likes Post
export function toggleLikesPost(id) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/like/${id}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(postActions.setLikes(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Update Post Image
export function updatePostImage(newImage, postId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("New post image uploaded successfully!!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Update Post 
export function updatePost(postData, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/${postId}`, postData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setPost(data))
            toast.success("New post updated successfully!!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

//^ Delete Post 
export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.deletePost(data.postId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}