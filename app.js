const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {connect} = require("mongoose")

connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sgpqskk.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books')
// const {verify} = require("./middleware/token");

const app = express();

app.use(cors({
    credentials: true,
    origin:  (origin, callback) => {
        if (`http://localhost:${process.env.FRONTEND_PORT}` !== origin) {
            callback(new Error('Unknown port'))
        } else {
            callback(null, true)
        }
    }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

module.exports = app;
