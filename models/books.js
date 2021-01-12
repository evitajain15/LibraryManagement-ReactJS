// //models >> books.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Books Schema
let BooksSchema = new Schema({
    book_id:{
        type: String,
        required: true
    },
    book_name: {
        type: String,
        required: true, 
        max: 100
    },
    author_name:{
        type: String, 
        required: true
    },
    book_cat:{
        type: String, 
        required: true
    },
    quantity:{
        type: String, 
        required: true
    },
    editedBy:{
        type:Object,
        default: {
            "name":"Admin"
        }
    },
    status:{
        type: Boolean,
        default: true
    }
});


// // Export the model
exports.require = mongoose.model('books', BooksSchema);

