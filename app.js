const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const {connect} = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const express = require('express');
const swaggerDocument = require('./swagger-output.json');

connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sgpqskk.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected'))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')
const { verify } = require('./middleware/token')


const app = express();

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {

        callback(null, true)

    },
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/check', verify, indexRouter)
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/swag', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app
