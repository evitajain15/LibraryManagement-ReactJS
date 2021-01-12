//models >> issueBook.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Issued Book Schema
let IssueBookSchema = new Schema({
    users:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    books: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    }
});


// Export the model
module.exports = mongoose.model('issueBook', IssueBookSchema);