const {Schema, model} = require("mongoose")

const question_schema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correct: Number
})

const book_schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    questions: [question_schema]
})
const book = model("book", book_schema)
module.exports = book