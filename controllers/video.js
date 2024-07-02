const videoService = require('../services/video');

const createVideo = async(req, res) => {
    res.json(await videoService.createVideo(req.body.title));
};
const getVideos = async(req, res) => {
    res.json(await videoService.getVideos());
};

const getVideo = async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
    return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const updateVideo = async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};
const deleteVideo = async (req, res) => {
    const video = await videoService.getVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

module.exports = {createVideo, getVideos, getVideo, updateVideo, deleteVideo };