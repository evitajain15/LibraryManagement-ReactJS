//Validation >> register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    console.log(data)
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : '';
    data.role = !isEmpty(data.role) ? data.role : '';


    // Validation on server side for register
    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.confirmPassword, {min: 6, max: 30})) {
        errors.confirmPassword = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Password is required';
    }
    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender is required';
    }
    if(!Validator.isLength(data.phoneNo, { min: 10, max: 10 })) {
        errors.phoneNo = 'Number must be 10';
    }
    if(Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = 'Phone No is required';
    }
    if(Validator.isEmpty(data.role)) {
        errors.role = 'Role is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}