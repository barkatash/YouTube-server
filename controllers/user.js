const userService = require('../services/user');

const createUser = async(req, res) => {
    res.json(await userService.createUser(req.body.title));
};
const getUser = async (req, res) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
    return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.body.title);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const getUserVideos = async (req, res) => {
    const videos = await userService.getUserVideos(req.params.id);
    res.json(videos);
};
const createUserVideo = async(req, res) => {
    res.json(await userService.createUserVideo(req.body.title));
};
const getUserVideo = async (req, res) => {
    const video = await userService.getUserVideo(req.params.id, req.params.pid);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const updateUserVideo = async (req, res) => {
    const video = await userService.updateUserVideo(req.body.title);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const deleteUserVideo = async (req, res) => {
    const video = await userService.deleteUserVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

module.exports = { createUser, getUser, updateUser, deleteUser, getUserVideos, createUserVideo, getUserVideo, updateUserVideo, deleteUserVideo };