

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    /* ^ Submit Login Handler */
    const SubmitForgotPasswordHandler = (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email is required")
        console.log({ email })
    }


    return (
        <section className="form-container">
            <h1 className="form-title">Forgot Password</h1>
            <form className="form" onSubmit={SubmitForgotPasswordHandler}>
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
                <button type="submit" className="form-btn">
                    Submit
                </button>
            </form>

        </section>
    )
}

export default ForgotPassword
