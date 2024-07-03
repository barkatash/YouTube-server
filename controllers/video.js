const videoService = require('../services/video');

const getVideos = async(req, res) => {
    res.json(await videoService.getVideos());
};

const getAllVideos = async(req, res) => {
    res.json(await videoService.getAllVideos());
};
const getVideo = async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
    return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const updateVideo = async (req, res) => {
    const video = await videoService.updateVideo(req.body.title);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const deleteVideo = async (req, res) => {
    const video = await videoService.deleteVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

module.exports = { getVideos,getAllVideos, getVideo, updateVideo, deleteVideo };