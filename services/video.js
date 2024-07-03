const Video = require('../models/video');
const { MoongoClient, MongoClient } = require("mongodb");


const getVideo = async (id) => {
    return await Video.findById(id)
};
const getAllVideos = async () => {
    return await Video.find({})
};

const getTenNumbers = (array) => 
{
    let counter = 10;
    let result = [];
    while(counter > 0){
        const randomIndex = Math.floor(Math.random() * (array.length))
        const isVideoAlreadyTaken = result.map(video => video.id).includes(array[randomIndex].id)
        if (!isVideoAlreadyTaken) 
            {
                counter--;
                result.push(array[randomIndex]);
            }
    }

    return result;
}

const compareVisits = (firstVideo, secondVideo) => secondVideo.visits - firstVideo.visits
const getVideos = async () => {
    const allVideos = await Video.find({});
    const topWatchedVideos = allVideos.sort(compareVisits);
    const otherVideos = topWatchedVideos.slice(10);
    return topWatchedVideos.slice(0, 10).concat(getTenNumbers(otherVideos));
};

const updateVideo = async (id, updatedVideo) => {
    const newVideo = await getVideo(id)
    if (!newVideo) return null

    newVideo.image = updatedVideo.image
    newVideo.video = updatedVideo.video
    newVideo.duration = updatedVideo.duration
    newVideo.uploadDate = updatedVideo.uploadDate
    newVideo.title = updatedVideo.title
    newVideo.description = updatedVideo.description
    await newVideo.save()
    return newVideo
};
const deleteVideo = async (id) => {
    const video = await Video.findByIdAndDelete(id);
    if (!video) return null;
    return video;
};

module.exports = {
    getAllVideos,
    getVideo,
    getVideos,
    updateVideo,
    deleteVideo
}

