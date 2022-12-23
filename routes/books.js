const express = require('express');
const router = express.Router();
const book = require("../tables/book");
const user = require("../tables/users");


/* Add a book */
router.post('/add', function (req, res, ignore) {
    const {title, author, ISBN, questions} = req.body
    const date = new Date()
    date.setMonth(date.getMonth() + 1, 1)
    book.create({
        title, author, ISBN, date, questions
    }).then((book) => {
        user.findOneAndUpdate({username: res.locals.username}, {$inc: {'wins': 1}})
            .exec((error, _) => {
                if (error) {
                    res.status(500).json({
                        message: `Book inserted, but failed to update user`, id: book._id
                    })
                } else {
                    res.status(201).json({
                        message: `Book inserted, user updated`, id: book._id
                    })
                }
            });
    }).catch((error) => {
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

router.get('/check-eligibility', function (req, res, ignore) {
    book.countDocuments({date: {"$gt": new Date()}}, function (err, count) {
        if (err) {
            res.status(400).json({
                message: "Error while checking eligibility"
            })
        } else {
            res.status(200).json({eligible: count < process.env.BOOKS_PER_MONTH, count})
        }
        console.log('there are %d entries for next month', count);
    });
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
    book.find().sort('-month').limit(process.env.BOOKS_PER_MONTH).exec((error, result) => {
        if (error) {
            res.status(500).json({message: "Error while retrieving books"})
        } else {
            res.json({books: result})
        }
    });
})

module.exports = router;
