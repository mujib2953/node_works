import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/Createprofile";
import Editprofile from "../profile-forms/EditProfile";
import AddExperince from "../profile-forms/AddExperince";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import NotFound from "../layout/NotFound";

// --- HOC
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/profiles" component={ Profiles } />
                <Route exact path="/profile/:id" component={ Profile } />

                {/* Private Routes */}
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
                <PrivateRoute exact path="/edit-profile" component={ Editprofile } />
                <PrivateRoute exact path="/add-experience" component={ AddExperince } />
                <PrivateRoute exact path="/add-education" component={ AddEducation } />
                <PrivateRoute exact path="/posts" component={ Posts } />
                <PrivateRoute exact path="/posts/:id" component={ Post } />

                <Route component={ NotFound } />
            </Switch>
        </section>
    );
};

export default Routes;
