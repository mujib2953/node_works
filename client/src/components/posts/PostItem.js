import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

import { addLike, removeLike, deletPost } from "../../actions/post";

const PostItem = ({
    auth,
    post: {
        _id,
        text,
        name,
        avatar,
        user,
        likes,
        comments,
        date,
    },
    addLike,
    removeLike,
    deletPost,
    showActions,
}) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={ `/profile/${user}` }>
                        <img
                            className="round-img"
                            src={ avatar }
                            alt="Users"
                        />
                        <h4>{ name }</h4>
                    </Link>
                </div>

                <div>
                    <p className="my-1">
                        { text }
                    </p>
                    <p className="post-date">
                        Posted on <Moment format="YYYY/MM/DD">{ date }</Moment>
                    </p>
                    {
                        showActions && (
                            <Fragment>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={ e => addLike(_id) }
                                >
                                    <i className="fas fa-thumbs-up"></i> { likes.length && (
                                        <span>{ likes.length }</span>
                                    ) }
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={ e => removeLike(_id) }
                                >
                                    <i className="fas fa-thumbs-down"></i>
                                </button>
                                <Link to={ `/posts/${_id}` } className="btn btn-primary">
                                    Discussion { comments.length > 0 && (
                                        <span className="comment-count">{ comments.length }</span>
                                    ) }
                                </Link>
                                {
                                    !auth.loading &&
                                    user === auth.user._id && (
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={ e => deletPost(_id) }
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
};

PostItem.defaultProps = {
    showActions: true,
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletPost: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {
        addLike,
        removeLike,
        deletPost,
    }
)(PostItem);
