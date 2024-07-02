const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new Schema({
    id: {
        type: Number
    },
    image : {
        type: String
    },
    video : {
        type: String
    },
    title : {
        type: String
    },
    duration : {
        type: String
    },
    visits : {
        type: String
    },
    uploadDate : {
        type: Date,
        default: Date.now
    },
    description : {
        type: String
    },
    likes : {
        type: Number
    },
    categoryId : {
        type: [Number],
    },
});
module.exports = mongoose.model('Video', Video);