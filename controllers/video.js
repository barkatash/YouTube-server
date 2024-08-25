const videoService = require('../services/video');
const userService = require('../services/user');
const { connectToCppServer } = require('../cppClient');

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

const getRecommendations = async (req, res) => {
    const users = await userService.getUsers();
    const videos = await videoService.getAllVideos();
    const recommendedVideoIds = await connectToCppServer(req.body.username, videos, users);
    const allVideos = await videoService.getAllVideos();
    const recommendedVideos = allVideos.filter(video => recommendedVideoIds.includes(video._id.toString()))
    res.json({ recommendations: recommendedVideos });
  };

module.exports = { getVideos,getAllVideos, getVideo, getRecommendations };