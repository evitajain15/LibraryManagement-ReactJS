//Validation >> book.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBooksInput(data) {
    let errors = {};
    console.log(data)
    data.book_id = !isEmpty(data.book_id) ? data.book_id : '';
    data.book_name = !isEmpty(data.book_name) ? data.book_name : '';
    data.author_name = !isEmpty(data.author_name) ? data.author_name : '';
    data.book_cat = !isEmpty(data.book_cat) ? data.book_cat : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';


    // Validation on server side for Books
    if(!Validator.isNumeric(data.book_id, { min: 1, max: 1000 })) {
        errors.book_id = 'Book Id must be between 1 to 1000 numbers';
    }
    
    if(Validator.isEmpty(data.book_id)) {
        errors.book_id = 'Book Id field is required';
    }

    if(!Validator.isLength(data.book_name, { min: 2, max: 30 })) {
        errors.book_name = 'Book Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.book_name)) {
        errors.book_name = 'Book Name field is required';
    }

    if(!Validator.isLength(data.author_name, { min: 2, max: 30 })) {
        errors.author_name = 'Author Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.author_name)) {
        errors.author_name = 'Author Name field is required';
    }

    if(!Validator.isLength(data.book_cat, { min: 2, max: 30 })) {
        errors.book_cat = 'Book Category must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.book_cat)) {
        errors.book_cat = 'Book Category field is required';
    }

    if(!Validator.isNumeric(data.quantity, { min: 1, max: 1000 })) {
        errors.quantity = 'Quantity must be between 1 to 1000 numbers';
    }
    
    if(Validator.isEmpty(data.quantity)) {
        errors.quantity = 'Quantity field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}