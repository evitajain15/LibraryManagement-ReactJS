const express = require('express');
const router = express.Router();
const bookCat = require('../models/bookCat');
const validateBookCatInput = require('../validation/bookcat'); 
const bcrypt = require('bcryptjs'); 

router.post('/bookcat', (req,res,next) => {
    const { errors, isValid } = validateBookCatInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    bookCat.findOne({
        book_cat: req.body.book_cat
    }).then(bookcat => {
        if(bookcat) {
            return res.status(400).json({
                book_cat: 'Book Category already exists'
            });
        }else {
            const bookcat = new bookCat({
                book_cat: req.body.book_cat
            });
            bcrypt.genSalt(10, (err) => {
                if(err) console.error('There was an error', err);
                    else {
                        bookcat.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send('Book Category Added successfully')
                        })
                    }
            });
        }
    })
})

router.get('/getbookcat',(req,res) =>{

    bookCat.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/editBookCat/:id',(req,res,next) =>{
    bookCat.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.put('/updateBookCat/:id', (req,res,next) =>{
    bookCat.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        console.log(req.body);
        if (err) return next(err);
        res.send('Book updated.');
    });
})


router.delete('/deleteBookCat/:id',(req,res,next) => {
    bookCat.findByIdAndDelete({_id:req.params.id}, function (err) {
        if (err) return next(err);
        res.send("Deleted Successfully!!");
    })
})  

module.exports = router;