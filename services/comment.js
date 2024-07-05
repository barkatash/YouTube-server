const User = require('../models/user');
const Comment = require('../models/comment');

const getComments = async() => {
    const allComments = await Comment.find({});
    return allComments
}

const createComment = async(username, videoId, description, uploadDate) => {
    const newComment = new Comment({ videoId, userName: username ,description })
    if (uploadDate) newComment.uploadDate = uploadDate
    newComment.likes = 0;
    newComment.dislikes = 0;
    await newComment.save()
    return newComment;
};

const getVideoComments = async(id) => {
    const allComments = await Comment.find({});
    return allComments.filter(comment => comment.videoId === id);
}
const getUserComment = async(id, pid) => {
    const comment = await Comment.findById(pid);
    const user = await User.findById(id);
    if (comment.userName === user.username) return comment;
    return null;
}
const updateUserComment = async(id, pid ,description) => {
    const newComment = await Comment.findOne({ _id: pid })
    const user = await User.findOne({ username: id })
    if (user && newComment && newComment.userName === user.username) {
        newComment.description = description
        return newComment
    }
    return null
}
const deleteUserComment = async (id, pid) => {
    const user = await User.findOne({ username: id })
    const comment = await Comment.findOne({ _id: pid })
    if (user && comment && comment.userName === user.username) {
        await comment.deleteOne()
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