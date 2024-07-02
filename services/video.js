const Video = require('../models/video');
const { MoongoClient, MongoClient } = require("mongodb");

// async function create() {
//     const Client = new MongoClient("mongodb://localhost:27017");
//     try {
//         const db = Client.db('youtube');
//         const
//     }
// }
    
const addVideo = async (id, image, video, title, duration, visits, uploadDate, description, likes, categoryId) => {
    const newVideo = new Video({ id, image, video, title, duration, visits, description, likes, categoryId })
    if (uploadDate) newVideo.uploadDate = uploadDate;
    return await newVideo.save()
};

const getVideo = async (id) => {
    return await Video.findById(id)
};

const getVideos = async () => {
    return await Video.find({})
};

const updateVideo = async (id, image, video, title, duration, visits, uploadDate, description, likes, categoryId) => {
    const newVideo = await getVideo(id)
    if (!newVideo)
        return null

    newVideo.image = image
    newVideo.video = video
    newVideo.duration = duration
    newVideo.image = image
    newVideo.uploadDate = uploadDate
    newVideo.title = title
    newVideo.description = description
    newVideo.visits = visits
    newVideo.likes = likes
    newVideo.categoryId = categoryId
    await newVideo.save()
    return newVideo
};
const deleteVideo = async (id) => {
    const video = await getVideo(id)
    if (!video)
        return null

    await video.remove()
    return video
};

module.exports = {
    addVideo,
    getVideo,
    getVideos,
    updateVideo,
    deleteVideo
}

