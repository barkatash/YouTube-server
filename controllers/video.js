const videoService = require('../services/video');

const getVideos = async(req, res) => {
    res.json(await videoService.getVideos());
};


module.exports = { getVideos };