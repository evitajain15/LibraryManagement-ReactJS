// //models >> books.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Books Schema
let BooksCatSchema = new Schema({
    book_cat:{
        type: String, 
        required: true
    }
});


// // Export the model
module.exports = mongoose.model('bookCat', BooksCatSchema);