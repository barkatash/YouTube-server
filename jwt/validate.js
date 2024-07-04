const jwt = require("jsonwebtoken")
const key = "key"

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const data = jwt.verify(token, key);
            req.data = data;
            return next();
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}
module.exports = { isLoggedIn };