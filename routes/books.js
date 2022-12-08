const express = require('express');
const router = express.Router();
const book = require("../tables/book");


/* GET home page. */
router.get('/', function (req, res, ignore) {
    book.create({
        title: "My Title", author: "Me", month: 1, ISBN: "1234-5665-4321"
    }).then((book) => res.status(201).json({
        message: `Book created`, id: book._id
    })).catch((error) => res.status(400).json({
        message: "Error while uploading book", error: error.message,
    }))
})

module.exports = router;
