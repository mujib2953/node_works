import axios from "axios";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT,

    USER_LOADED,
    AUTH_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

/*
* This will register new user to the application
* In return it will store jwt token to local storage
*/
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post("/api/users/register", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch(error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

/*
* This will loged-in existing user of the application
* If everything is fine then in return we will get a jwtToken
*/
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch(error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

/*
* This will load the logged-in/register user details
* mainly user_id
*/
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/auth");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

/*
* This will logout the user from the application
* and then destroy the jwtToken
*/

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}
