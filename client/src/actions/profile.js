import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR,
} from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch(e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
}

// --- create/update profile of the user
export const createprofile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert(
            edit ? "Profile Updated" : "Profile Created",
            "success",
            3000
        ));

        if (!edit) {
            history.push("/dashboard");
        }
    } catch(error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(e => dispatch(setAlert(e.message, "danger", 3000)));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}
