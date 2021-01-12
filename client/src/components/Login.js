import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
            roles: []
        };
    }   

onChange = e => {
    this.setState({ 
        [e.target.id]: e.target.value 
    });
};

onSubmit = e => {
    e.preventDefault();
    const userData = {
        email: this.state.email,
        password: this.state.password

    };
    this.props.loginUser(userData);
};


componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'Admin') {
        this.props.history.push('/dashboard');
        if(localStorage.getItem('roles') == null){
            var roles = [];
            roles.push(nextProps.auth.user.role);
            localStorage.setItem('roles', JSON.stringify(roles));
          }
    }
    if(nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'Librarian') {
        this.props.history.push('/dashboardLibrarian');
        if(localStorage.getItem('roles') == null){
            roles = [];
            roles.push(nextProps.auth.user.role);
            localStorage.setItem('roles', JSON.stringify(roles));
          }
    }
    if(nextProps.auth.isAuthenticated && nextProps.auth.user.role === 'Student') {
        this.props.history.push('/dashboardStudent');
        if(localStorage.getItem('roles') == null){
            roles = [];
            roles.push(nextProps.auth.user.role);
            localStorage.setItem('roles', JSON.stringify(roles));
          }
    }
    if(nextProps.errors) {  
        this.setState({
            errors: nextProps.errors
        });
    }
}

componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
}


render() {
    const { errors } = this.state;
    
    return (
    <div className="container">
        <div className="row">
            <div className="heading">
                <div className="subheading">
                    <Link to="/" className="back-home">Back to home </Link>
                </div>
                <div className="col-sm-12">
                    <h4>
                        <b>Login</b> below
                    </h4>
                    <p>Not Register ?  <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                        /> 
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })} 
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-large btn-success">Log In</button>
        </form>
    </div>
    );
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)