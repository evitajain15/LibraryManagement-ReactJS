import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender:"Male",
            phoneNo: "",
            selectedOption: "Librarian",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };

    handleChange = e => {
        this.setState({  
            selectedOption: e.target.value
        });
    }
    
    genderChange = e => {
        this.setState({  
            gender: e.target.value
        });  
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            gender: this.state.gender,
            phoneNo: this.state.phoneNo,
            role: this.state.selectedOption
        };
        this.props.registerUser(newUser, this.props.history);
    };


    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
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
                        <b>Register</b> below
                    </h4>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="name">Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                />  
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>
                        </div>
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.confirmPassword}
                                    error={errors.confirmPassword}
                                    id="confirmPassword"
                                    type="password"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.confirmPassword
                                    })}
                                />
                                {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="checkbox">Gender</label>
                                <input 
                                    type="radio" 
                                    name="gender"
                                    id="Male"
                                    checked={this.state.gender === "Male"} 
                                    onChange={this.genderChange}
                                    value='Male'
                                    error={errors.male}    
                                />Male
                                
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    id="Female"
                                    onChange={this.genderChange}
                                    checked={this.state.gender === "Female"}
                                    value='Female'
                                    error={errors.female} />Female
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="phoneNo">Phone No.</label>
                                <input
                                
                                    onChange={this.onChange}
                                    value={this.state.phoneNo}
                                    error={errors.phoneNo}
                                    id="phoneNo"
                                    type="number"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.phoneNo
                                    })}
                                />
                                {errors.phoneNo && (<div className="invalid-feedback">{errors.phoneNo}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="checkbox">Role</label>
                                {/* <input 
                                    type="radio" 
                                    name="role"
                                    id="Admin"
                                    checked={this.state.selectedOption === "Admin"} 
                                    onChange={this.handleChange}
                                    value='Admin'
                                    error={errors.admin}    
                                />Admin */}

                                <input 
                                    type="radio" 
                                    name="role"
                                    id="Librarian"
                                    checked={this.state.selectedOption === "Librarian"} 
                                    onChange={this.handleChange}
                                    value='Librarian'
                                    error={errors.librarian}    
                                />Librarian
                                
                                <input 
                                    type="radio" 
                                    name="role" 
                                    id="Student"
                                    onChange={this.handleChange}
                                    checked={this.state.selectedOption === "Student"}
                                    value='Student'
                                    error={errors.student} />Student
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-large btn-success">Submit</button>
                </form>
            </div>  
        </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
