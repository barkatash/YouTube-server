const User = require('../models/user');
const { MongoClient } = require("mongodb");

const addUser = async (username, displayName , password ,image) => {
    const newUser = new User({ username, displayName , password })
    if (image) newUser.image = image;
    return await newUser.save()
};

const getUser = async (id) => {
    return await User.findById(id)
};

const updateUser = async ( id, username, displayName , password ,image, videoIdListLiked, videoIdListUnliked, commentIdListLiked, commentIdListUnliked) => {
    const newUser = await getUser(id)
    if (!newUser)
        return null
    newUser.username = username
    newUser.displayName = displayName
    newUser.password = password
    newUser.image = image
    newUser.videoIdListLiked = videoIdListLiked
    newUser.videoIdListUnliked = videoIdListUnliked
    newUser.commentIdListLiked = commentIdListLiked
    newUser.commentIdListUnliked = commentIdListUnliked
    await newUser.save()
    return newUser
};
const deleteUser = async (id) => {
    const video = await getUser(id)
    if (!video)
        return null

    await video.remove()
    return video
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
}

