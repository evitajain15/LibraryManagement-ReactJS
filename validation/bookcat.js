//Validation >> bookCat.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookCatInput(data) {
    let errors = {};
    
    data.book_cat = !isEmpty(data.book_cat) ? data.book_cat : '';


    // Validation on server side for Books Category

    if(!Validator.isLength(data.book_cat, { min: 2, max: 30 })) {
        errors.book_cat = 'Book Category must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.book_cat)) {
        errors.book_cat = 'Book Category field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}