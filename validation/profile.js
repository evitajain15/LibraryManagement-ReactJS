//Validation >> register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfile(data) {
    let errors = {};
    console.log(data)
    
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    


    // Validation on server side for register
    

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}