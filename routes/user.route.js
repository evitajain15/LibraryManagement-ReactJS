//routes >> user.route.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const users = require('../models/users');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateProfile = require('../validation/profile');


//API Call for Register form
router.post('/register', function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    users.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const register = new users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                gender: req.body.gender,
                phoneNo: req.body.phoneNo,
                role: req.body.role
            });
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(register.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            register.password = hash;
                            register
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    })
});


//API Call for Login Form
router.post('/login', function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    users.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            gender: user.gender,
                            phoneNo: user.phoneNo,
                            role: user.role
                        }
                        
                        jwt.sign(payload, 'secret', {expiresIn: 3600}, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        }); 
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        gender:req.user.gender,
        phoneNo:req.user.phoneNo
    });
});

// API to get all the user information
router.get('/getUser',(req,res,next) =>{

    users.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});


// API to get all the Student information
router.get('/getStudentUser',(req,res,next) =>{
    var query = { role: "Student" };
    users.find(query, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});


// API to edit the user details
router.get('/editUser/:id', (req, res, next) =>{
    users.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
})


// API to update the profile of particular user
router.put('/updateProfile/:id', (req,res,next) =>{
    // const { errors, isValid } = validateProfile(req.body);

    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }
    users.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.send('user details are updated');
    });
})

module.exports = router;    