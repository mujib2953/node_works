import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ 
    profile: {
        user: { avatar, name, _id },
        status,
        company,
        location,
        skills,
    }
}) => {
    return (
        <Fragment>
            <div class="profile bg-light">
                <img
                    class="round-img"
                    src={ avatar }
                    alt=""
                />

                <div>
                    <h2>{ name }</h2>
                    <p>
                        { status } { company && (
                            <span> at { company }</span>
                        ) }
                    </p>
                    <p>{ location && <span>{ location }</span> }</p>
                    <Link
                        to={`/profile/${_id}`}
                        class="btn btn-primary"
                    >
                        View Profile
                    </Link>
                </div>

                <ul>
                    {
                        skills.slice(0, 4).map((skill, index) => (
                            <li
                                class="text-primary"
                                key={index}
                            >
                                <i class="fas fa-check"></i> { skill }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Fragment>
    );
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
