import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const { registerMessage } = useSelector(state => state.auth)

    console.log(registerMessage)

    const nav = useNavigate()

    /* ^ Submit Register Handler */
    const SubmitRegisterHandler = (e) => {
        e.preventDefault();
        if (username.trim() === "") return toast.error("Username is required!!")
        if (email.trim() === "") return toast.error("Email is required!!")
        if (password.trim() === "") return toast.error("Password is required!!")
        dispatch(registerUser({ username, email, password }))
    }

    if (registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if (isOk) {
                //^ Go To Login Page
                nav("/login")
            }
        })
    }

    return (
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form className="form" onSubmit={SubmitRegisterHandler}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="form-btn">
                    Register
                </button>
            </form>
            <div className="form-footer">
                Already have an account?<Link to={"/login"}>Login</Link>
            </div>
        </section>
    );
};

export default Register;
