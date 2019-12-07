import React, { Fragment, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/Createprofile";
import Editprofile from "./components/profile-forms/EditProfile";
import AddExperince from "./components/profile-forms/AddExperince";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

// --- HOC
import PrivateRoute from "./components/routing/PrivateRoute";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
// redux related
import { Provider } from "react-redux";
import store from "./store";

import "./css/Common.css";
import "./css/App.css";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={ store }>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={ Landing } />
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
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
