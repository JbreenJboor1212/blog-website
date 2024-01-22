import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <div className='admin-sidebar'>
            <Link to={"/admin-dashboard"} className='admin-side-bar-title'>
                <i className="bi bi-columns"></i>
                Dashboard
            </Link>
            <ul className="admin-dashboard-list">
                <NavLink to={"/admin-dashboard/users-table"} className='admin-sidebar-link'>
                    <i className="bi bi-person"></i>
                    Users
                </NavLink>
                <NavLink to={"/admin-dashboard/posts-table"} className='admin-sidebar-link'>
                    <i className="bi bi-file-post"></i>
                    Posts
                </NavLink>
                <NavLink to={"/admin-dashboard/categories-table"} className='admin-sidebar-link'>
                    <i className="bi bi-tag-fill"></i>
                    Categories
                </NavLink>
                <NavLink to={"/admin-dashboard/comments-table"} className='admin-sidebar-link'>
                    <i className="bi bi-chat-left-text"></i>
                    Comments
                </NavLink>
            </ul>
        </div>
    )
}

export default AdminSidebar
