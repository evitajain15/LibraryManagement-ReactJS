import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.user.role === 'Admin' ? 
      (
        <Component {...props} />
      )
      :
      auth.isAuthenticated === true && auth.user.role === 'Librarian' ? 
      (
        <Component {...props} />
      )
      :
      auth.isAuthenticated === true && auth.user.role === 'Student' ? 
      (
        <Component {...props} />
      )
      
      : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
}
);


export default connect(mapStateToProps)(PrivateRoute);
