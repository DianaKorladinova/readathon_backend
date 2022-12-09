const {Schema, model} = require("mongoose")

const participation_schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    answers_correct: Number,
})

const user_schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    participations: [participation_schema],
    wins: {
        type: Number,
        default: 0
    }
})
const user = model("user", user_schema)
module.exports = user