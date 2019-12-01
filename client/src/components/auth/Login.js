import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        console.log("SUCCESS");
    }

    return (
        <Fragment>
            <div className="alert alert-danger">
                Invalid Credentials.
            </div>

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Sign into Your Account
            </p>

            <form
                className="form"
                onSubmit={ e => onSubmit(e) }
            >
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={ email }
                        onChange={ e => handleChange(e) }
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ e => handleChange(e) }
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}
