
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { loginUser } from '../../redux/apiCalls/authApiCall'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

  /* ^ Submit Login Handler */
  const SubmitLoginHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required")
    if (password.trim() === "") return toast.error("Password is required")
    dispatch(loginUser({ email, password }))
  }


  return (
    <section className="form-container">
      <h1 className="form-title">Login To Your Account</h1>
      <form className="form" onSubmit={SubmitLoginHandler}>
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
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password ?<Link to={"/forgot-password"}> Forgot Password</Link>
      </div>
    </section>
  )
}

export default Login
