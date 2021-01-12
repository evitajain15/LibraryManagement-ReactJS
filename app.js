const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

//Routing
const register = require('./routes/user.route');
const login = require('./routes/user.route');
const addbooks = require('./routes/book.route');
const bookscat = require('./routes/bookCat.route');
const getbookcat = require('./routes/bookCat.route');
const issueBook = require('./routes/issueBook.route');


//Express
const app = express();

// Database connection
const config = require("./db").mongoURI;

mongoose
    .connect(config,
            { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
    
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Body Parser-Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Passport Initialization
app.use(passport.initialize());
require('./passport')(passport);


app.use('/api/library',login);
app.use('/api/library',register);
app.use('/api/library',addbooks);
app.use('/api/library', bookscat);
app.use('/api/library', getbookcat);
app.use('/api/library', issueBook);

//PORT
let port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

