const express = require('express');
const router = express.Router();
const book = require("../tables/book");


/* Add a book */
router.post('/add', function (req, res, ignore) {
    const {title, author, ISBN, questions} = req.body
    const date = new Date()
    date.setMonth(date.getMonth() + 1, 1)
    book.create({
        title, author, ISBN, date, questions
    }).then((book) => res.status(201).json({
        message: `Book created`, id: book._id
    })).catch((error) => {
        if (error["code"] === 11000) {
            res.status(400).json({
                message: "ISBN provided is already in the database! Go down history lane and make sure your book is new!",
                error: "Duplicate ISBN",
            })
        } else {
            res.status(500).json({
                message: "Error while uploading book", error: error.message,
            })
        }

    })
})

router.get("/history-lane", function (req, res, ignore) {
    book.find({}, function (error, books) {
        if (error) {
            res.status(500).json({message: "Error while retrieving books"})
        } else {
            res.status(200).json({books})

        }
    });
})

router.get("/monthly-challenge", function (req, res, ignore) {
    book.find().sort('-month').limit(8).exec((error, result) => {
        if (error) {
            res.status(500).json({message: "Error while retrieving books"})
        } else {
            res.json({books: result})
        }
    });
})

module.exports = router;
