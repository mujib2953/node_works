import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProfile } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({
    getProfile,
    profile: { profiles, loading }
}) => {

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    if (loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <h1 class="large text-primary">Developers</h1>
            <p class="lead">
                <i class="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>

            <div class="profiles">
                {
                    profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem
                                key={ profile._id }
                                profile={ profile }
                            />
                        ))
                    ) : (
                        <h4>No Profiles found.</h4>
                    )
                }
            </div>
        </Fragment>
    );
}

Profiles.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profiles);
