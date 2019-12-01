import React from "react";

export default function Register() {
    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>

            <form className="form" action="create-profile.html">
                <div className="form-group">
                    <input type="text" name="name" placeholder="Name" required />
                </div>

                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" required />
                    <small className="form-text">
                        This site uses Gravatar so if you want profile image, use a Gravatar email.
                    </small>
                </div>

                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" minlength="6" />
                </div>

                <div className="form-group">
                    <input type="password" name="password2" placeholder="Confirm Password" minlength="6" />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>

            <p className="my-1">
                Already have an accont? <a href="login.html">Sign In</a>
            </p>
        </section>
    );
}
