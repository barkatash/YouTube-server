const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

const getImageBase64 = (filePath) => {
    try {
        const imageData = fs.readFileSync(filePath);
        const base64Image = Buffer.from(imageData).toString('base64');
        const mimeType = `image/${path.extname(filePath).slice(1)}`;
        return `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return null;
    }
};

const getFileBase64 = (filePath) => {
    try {
        const fileData = fs.readFileSync(filePath);
        const base64File = Buffer.from(fileData).toString('base64');
        const mimeType = `video/${path.extname(filePath).slice(1)}`;
        return `data:${mimeType};base64,${base64File}`;
    } catch (error) {
        console.error('Error converting file to base64:', error);
        return null;
    }
};

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

module.exports = {
    getAllVideos,
    getVideo,
    getVideos
}

