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

const updateVideo = async (id, image, video, title, duration, visits, uploadDate, description, likes, categoryId) => {
    const newVideo = await getVideo(id)
    if (!newVideo) return null

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
    getAllVideos,
    getVideo,
    getVideos,
    updateVideo,
    deleteVideo
}

