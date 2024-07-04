const CommentService = require('../services/comment');

const getComments = async (req, res) => {
    const comments = await CommentService.getComments();
    res.json(comments);
};
const createComment = async(req, res) => {
    res.json(await CommentService.createComment(req.params.id, req.params.pid, req.body.description));
};
const getVideoComments = async (req, res) => {
    const comments = await CommentService.getVideoComments(req.params.id);
    res.json(comments);
};
const getUserComment = async (req, res) => {
    const comments = await CommentService.getUserComment(req.params.id, req.params.pid);
    res.json(comments);
};
const updateUserComment = async (req, res) => {
    const comment = await CommentService.updateUserComment(req.params.id, req.params.pid, req.body.title);
    if (!comment) {
        return res.status(404).json({ errors: ['Comment not found'] });
    }
    res.json(comment);
};
const deleteUserComment = async (req, res) => {
    const Comment = await CommentService.deleteUserComment(req.params.id, req.params.pid);
    if (!Comment) {
        return res.status(404).json({ errors: ['Comment not found'] });
    }
    res.json(Comment);
};

module.exports = { getComments, createComment, getVideoComments, getUserComment, updateUserComment, deleteUserComment };