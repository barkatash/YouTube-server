const User = require('../models/user');
const jwt = require("jsonwebtoken")
const key = "key"

const login = async (username, password) => {
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        const response = {
            result: 'failure',
            message: `Invalid username and/or password`,
            status: 404
        }
        return response;
    }

    const data = { username: username }
    const token = jwt.sign(data, key)

    const response = {
        username: username,
        displayName: user.displayName,
        image: user.image,
        videoIdListLiked: user.videoIdListLiked,
        videoIdListUnliked: user.videoIdListUnliked,
        commentIdListLiked: user.commentIdListLiked,
        commentIdListUnliked: user.commentIdListUnliked,
        result: 'success',
        status: 200,
        data: token
    }
    return response;
}

module.exports = { login };