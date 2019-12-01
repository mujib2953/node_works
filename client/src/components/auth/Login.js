import React from "react";

export default function Login() {
    return (
        <section className="container">
            <div className="alert alert-danger">
                Invalid Credentials.
            </div>

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Sign into Your Account
            </p>

            <form action="dashboard.html" className="form">
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" required />
                </div>

                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" required />
                </div>

                <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>

            <p className="my-1">
                Don't have an account? <a href="register.html">Sign Up</a>
            </p>
        </section>
    );
}
