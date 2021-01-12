const express = require('express');
const router = express.Router();
const issueBooks = require('../models/issueBook');
const books = require('../models/books');
const users = require('../models/users');

router.get("/getissueBooks", (req, res, next) => {
    issueBooks.find()
      .populate('books',['_id', 'book_id', 'book_name', 'author_name', 'quantity'])
      .populate('users',['id', 'name', 'email', 'phoneNo'])
      .exec()
      .then(docs => {
        res.status(200).json({
          issuebooks: docs.map(doc => {
            return {
                _id: doc._id,
              books: doc.books,
              users: doc.users,
              issueDate: doc.issueDate.toDateString(),
              returnDate: doc.returnDate.toDateString()
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  router.post("/issueBook", (req, res, next) => {
    books.find(req.body)
      .then(books => {
        if (!books) {
          return res.status(404).json({
            message: "Book not found"
          });
        }
        const issueBook = new issueBooks({
          issueDate: req.body.issueDate,
          returnDate: req.body.returnDate,
          books: req.body,
          users: req.body.id
        });
        return issueBook.save();
      })
      .then(result => {
        res.status(201).json({
          message: "Book issued",
          issuedBook: {
            users: result.users,
            books: result.books,
            issueDate: result.issueDate,
            returnDate: result.returnDate
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

module.exports = router;