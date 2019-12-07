import axios from "axios";

import { setAlert } from "./alert";

import {
    GET_POSTS,
    POST_ERROR,

    UPDATE_LIKES,
} from "./types";

// --- get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts");

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch(error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// --- Add like
export const addLike = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${ post_id }`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: post_id, likes: res.data },
        });
    } catch(error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// --- Remove like
export const removeLike = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${ post_id }`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: post_id, likes: res.data },
        });
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};
