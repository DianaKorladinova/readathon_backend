const express = require('express');
const user = require("../tables/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

/* Register user */
router.post('/register', async function (req, res, ignore) {
    const {username} = req.body;
    const pass = req.body.password
    const password = await bcrypt.hash(pass, 10)
    const doc = await user.create({
        username, password,
    })
    jwt.sign({id: doc._id, username}, process.env.SECRET, {
        expiresIn: process.env.EXPIRATION,
    }, function (err, token) {
        if (err) {
            res.status(500).json({
                message: "Failed to sign token"
            })
        } else {
            res.status(201).json({
                message: "User created", id: doc._id, token
            })
        }
    })
});

router.post('/login', async function (req, res, ignore) {
    const {username, password} = req.body
    const doc = await user.findOne({username})
    if (!doc) {
        res.status(400).json({
            message: `User ${username} not found`,
        })
    } else {
        bcrypt.compare(password, doc.password).then(equal => {
            if (equal) {
                jwt.sign({id: doc._id, username}, process.env.SECRET, {
                    expiresIn: process.env.EXPIRATION,
                }, function (err, token) {
                    if (err) {
                        res.status(500).json({
                            message: "Failed to sign token"
                        })
                    } else {
                        res.status(200).json({
                            message: "User logged in", id: doc._id, token
                        })
                    }
                })
            } else {
                res.status(403).json({message: "Wrong password"})
            }
        })
    }
});


module.exports = router;
