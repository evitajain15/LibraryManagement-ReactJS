import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';


class Navbar extends Component{
    
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }


    render(){
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav">
                <span className="fas fa-user-circle profile"><span className="username">{user.name}</span></span>
                <Link className="nav-link" to="/" onClick={this.onLogout.bind(this)}>
                    Logout
                </Link>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav navbar-expand">
                <li className="nav-item">
                    <Link className="nav-link" to="/register"> 
                        Sign Up
                    </Link>    
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Sign In
                    </Link>  
                </li>
            </ul>
          )


        return(
            <nav className="navbar navbar-default">
                <i className="navbar-brand">Knowledge Hub <span>Turn the Page</span></i>
                <div className="menus">
                    {isAuthenticated === true ? authLinks : guestLinks}
                </div>
		    </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));