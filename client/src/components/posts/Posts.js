import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPosts } from "../../actions/post";

import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({
    getPosts,
    post: {
        posts,
        loading,
    }
}) => {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community!
            </p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say something....</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="submit" />
                </form>
            </div>

            <div className="posts">
                {
                    posts.map(post => (
                        <PostItem key={ post._id } post={ post } />
                    ))
                }
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
