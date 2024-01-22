import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory } from '../../redux/apiCalls/categoryApiCall'
import { getUsersCount } from '../../redux/apiCalls/profileApiCall'
import { getPostsCount } from '../../redux/apiCalls/postsApiCall'
import { getAllComments } from '../../redux/apiCalls/commentApiCall'

const AdminMain = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    const { usersCount } = useSelector(state => state.profile);
    const { postsCount } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comment);

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getUsersCount());
        dispatch(getPostsCount());
        dispatch(getAllComments())
    }, [dispatch])

    return (
        <div className='admin-main'>
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <h5 className="admin-card-count">{usersCount}</h5>
                    <h5 className="admin-card-wrapper">
                        <Link to={"/admin-dashboard/users-table"} className='admin-card-link'>
                            See All Users
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </h5>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Posts</h5>
                    <h5 className="admin-card-count">{postsCount}</h5>
                    <h5 className="admin-card-wrapper">
                        <Link to={"/admin-dashboard/posts-table"} className='admin-card-link'>
                            See All Posts
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-post"></i>
                        </div>
                    </h5>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <h5 className="admin-card-count">{categories?.length}</h5>
                    <h5 className="admin-card-wrapper">
                        <Link to={"/admin-dashboard/categories-table"} className='admin-card-link'>
                            See All Categories
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tag-fill"></i>
                        </div>
                    </h5>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Comments</h5>
                    <h5 className="admin-card-count">{comments?.length}</h5>
                    <h5 className="admin-card-wrapper">
                        <Link to={"/admin-dashboard/comments-table"} className='admin-card-link'>
                            See All Comments
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </div>
                    </h5>
                </div>
            </div>
            <AddCategoryForm />
        </div>
    )
}

export default AdminMain
