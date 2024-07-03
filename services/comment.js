const User = require('../models/user');
const Video = require('../models/video');
const Comment = require('../models/comment');

const { MongoClient } = require("mongodb");

const getComments = async() => {
    const allComments = await Comment.find({});
    return allComments
}

const createComment = async(videoId, userName ,description, uploadDate) => {
    const newComment = new Comment({ videoId, userName ,description })
    if (uploadDate) newComment.uploadDate = uploadDate
    newComment.likes = 0;
    newComment.dislikes = 0;
    await newComment.save()
    return newComment;
};

const getVideoComments = async(id) => {
    const video = await Video.findById(id)
    const allComments = await Comment.find({});
    return allComments.filter(comment => comment.videoId === video.id);
}
const getUserComment = async(id, pid) => {
    const comment = await Comment.findById(pid);
    const user = await User.findById(id);
    if (comment.userName === user.username) return comment;
    return null;
}
const updateUserComment = async(id, pid ,description, uploadDate) => {
    const newComment = await Comment.findById(pid)
    const user = await User.findById(id);
    if (!newComment)
        return null
    if (newComment.userName === user.username) {
        newComment.description = description
        if (uploadDate) newComment.uploadDate = uploadDate
        return newComment
    }
    return null
}
const deleteUserComment = async (id, pid) => {
    const user = await User.findById(id);
    const comment = await Comment.findById(pid)
    if (user && comment && comment.userName === user.username) {
        await comment.remove()
        return comment
    }
    return null
};

module.exports = {
    getComments,
    createComment,
    getVideoComments,
    getUserComment,
    updateUserComment,
    deleteUserComment
}