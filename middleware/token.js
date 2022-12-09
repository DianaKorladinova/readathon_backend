const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({error: 'No credentials sent!'});
    } else {
        jwt.verify(token, process.env.SECRET, {}, (err, result) => {
            if (err) {
                return res.status(403).json({message: "Bad token"});
            } else {
                const {username} = result
                res.locals = {username}
                return next();
            }
        })
    }
}