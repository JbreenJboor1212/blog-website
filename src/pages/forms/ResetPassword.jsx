
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState("")

  /* ^ Submit Reset Password Handler */
  const SubmitResetPasswordHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required")
    console.log({ password })
  }


  return (
    <section className="form-container">
      <h1 className="form-title">Reset Password</h1>
      <form className="form" onSubmit={SubmitResetPasswordHandler}>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter your new password"
          />
        </div>
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  )
}

export default ResetPassword
