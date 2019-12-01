import React from "react";

export default function Landing() {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>

                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from other developer.
                    </p>

                    <div className="button">
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Sign In</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
