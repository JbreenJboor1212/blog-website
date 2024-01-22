
import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLeft = ({ toggle, setToggle }) => {
    return (
        <Link className="header-left">
            <div className="header-logo">
                <strong>BLOG</strong>
                <i className="bi bi-pencil-fill"></i>
            </div>
            <div className="header-menu" onClick={() => setToggle(prev => !prev)}>
                {!toggle ? <i className='bi bi-list'></i> : <i className="bi bi-x-lg"></i>}
            </div>
        </Link>
    )
}

export default HeaderLeft
