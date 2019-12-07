import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPost } from "../../actions/post";

import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Post = ({
    getPost,
    post: {
        loading,
        post
    },
    match,
}) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    if (loading || post === null) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <Link to="/posts" class="btn">Back To Posts</Link>

            <PostItem post={ post } showActions={ false } />
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
