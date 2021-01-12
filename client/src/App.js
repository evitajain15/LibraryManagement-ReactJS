import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import './App.css';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import DashboardLibrarian from './components/dashboard/DashboardLibrarian';
import DashboardStudent from './components/dashboard/DashboardStudent';


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {

  render() {    
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/dashboardLibrarian" component={DashboardLibrarian} />
                  <PrivateRoute exact path="/dashboardStudent" component={DashboardStudent} />
              </Switch>
              <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
