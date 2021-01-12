//models >> users.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
let UserSchema = new Schema({
    name: {
        type: String,
        required: true, 
        max: 100
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    confirmPassword:{
        type: String, 
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    phoneNo:{
        type:Number,
        required: true
    },
    role: {
        type: String, 
        required: true
    }
});


// Export the model
module.exports = mongoose.model('users', UserSchema);