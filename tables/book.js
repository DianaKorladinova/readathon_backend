const {Schema, model} = require("mongoose")
const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    }
})
const book = model("book", schema)
module.exports = book