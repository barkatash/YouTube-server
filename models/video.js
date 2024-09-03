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
    uploader : {
        type: String,
        require: true
    },
    duration : {
        type: String,
        default: "2:00"
    },
    visits : {
        type: Number,
        default: 0
    },
    uploadDate : {
        type: Date,
        default: Date.now
    },
    description : {
        type: String,
        default: ""
    },
    likes : {
        type: Number,
        default: 0
    },
    categoryId : {
        type: [Number],
        default: []
    },
});
module.exports = mongoose.model('Video', Video);