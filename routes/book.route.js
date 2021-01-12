const express = require('express');
const router = express.Router();
const books = require('../models/books');
const validateBooksInput = require('../validation/books'); 
const bcrypt = require('bcryptjs'); 

router.post('/addbooks', (req,res,next) => {
    const { errors, isValid } = validateBooksInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    books.findOne({
        // book_id: req.body.book_id,
        book_name: req.body.book_name
    }).then(book => {
        if(book) {
            return res.status(400).json({
                // book_id: 'Book ID already exists',
                book_name: 'Book Name already exists'
            });
        } else {
            const addbook = new books({
                book_id: req.body.book_id,
                book_name: req.body.book_name,
                author_name: req.body.author_name,
                book_cat: req.body.book_cat,
                quantity: req.body.quantity,
                status: req.body.status
            });
            bcrypt.genSalt(10, (err) => {
                if(err) console.error('There was an error', err);
                    else {
                        addbook.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send('Book Created successfully')
                        })  
                    }
                });
            }
        });
})

router.get('/getbook',(req,res,next) =>{

    books.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/viewBookDetail/:id', (req,res,next) =>{
    books.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
})

router.get('/editBook/:id',(req,res,next) =>{
    books.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.put('/updateBook/:id', (req,res,next) =>{
    // const { errors, isValid } = validateBooksInput(req.body);

    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }

    // books.findOne({
    //     // book_id: req.body.book_id,
    //     book_name: req.body.book_name
    // }).then(book => {
    //     if(book) {
    //         return res.status(400).json({
    //             // book_id: 'Book ID already exists',
    //             book_name: 'Book Name already exists'
    //         });
    //     } else {
            books.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
                console.log(req.body);
                if (err) return next(err);
                res.send('Book updated.');
            });
    //     }
    // })
})

router.put('/activeBook/:id', (req,res,next) =>{
    books.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.json({
            status: 200,
            result: result
        })
    });
})

router.delete('/deleteBook/:id',(req,res,next) => {
    books.findByIdAndDelete({_id:req.params.id}, function (err) {
        if (err) return next(err);
        res.send("Deleted Successfully!!");
    })
})  

module.exports = router;