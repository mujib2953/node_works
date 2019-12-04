import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { createprofile } from "../../actions/profile";

const CreateProfile = ({ createprofile, history }) => {

    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        createprofile(formData, history, );
    };

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile stand out
            </p>

            <small>* = required field</small>
            <form
                className="form"
                onSubmit={ e => onSubmit(e) }
            >
                <div className="form-group">
                    <select
                        name="status"
                        value={ status }
                        onChange={e => onChange(e)}
                    >
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us idea of where you are at in your career
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={company}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={website}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own website or company website
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={location}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        City & State suggested (e.g. Boston, MA)
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="skills"
                        placeholder="* Skills"
                        value={skills}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        Please use comma separated values (e.g. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="githubusername"
                        placeholder="Github Username"
                        value={githubusername}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and Github link, include your username
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        name="bio"
                        placeholder="A short bio of yourself"
                        value={bio}
                        onChange={e => onChange(e)}
                    ></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={ () => toggleSocialInputs(!displaySocialInputs) }
                    >Add Social Network Links</button>
                    <span>Optional</span>
                </div>

                {
                    (displaySocialInputs) && (
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-3x"></i>
                                <input
                                    type="text"
                                    name="twitter"
                                    placeholder="Twitter URL"
                                    value={twitter}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-3x"></i>
                                <input
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook URL"
                                    value={facebook}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-3x"></i>
                                <input
                                    type="text"
                                    name="youtube"
                                    placeholder="Youtube URL"
                                    value={youtube}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-3x"></i>
                                <input
                                    type="text"
                                    name="linkedin"
                                    placeholder="Linkedin URL"
                                    value={linkedin}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-3x"></i>
                                <input
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram URL"
                                    value={instagram}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )
                }

                <input type="submit" className="btn btn-primary my-1" />
                <Link
                    className="btn btn-light my-1"
                    to="/dashboard"
                >Go Back</Link>
            </form>
        </Fragment>
    );
}

CreateProfile.propTypes = {
    createprofile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { createprofile })(withRouter(CreateProfile));
