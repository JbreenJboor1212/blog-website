import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [openDropDown, setOpenDropDown] = useState(false);
  const nav = useNavigate()

  //^ Logout Handler
  const LogoutHandler = () => {
    setOpenDropDown(prev => !prev)
    dispatch(logoutUser())
    nav("/login")
  }


  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              className="header-right-username"
              onClick={() => setOpenDropDown((prev) => !prev)}
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="user"
              className="header-right-user-photo"
            />
            {openDropDown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setOpenDropDown((prev) => !prev)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div
                  className="header-dropdown-item"
                  onClick={LogoutHandler}
                >
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to={"/login"} className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to={"/register"} className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
