const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    videoId: {
        type: Number,
        require: true,
    },
    userName : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    uploadDate : {
        type: Date,
        default: Date.now
    },
    likes : {
        type: Number
    },
    dislikes : {
        type: Number
    },
});
module.exports = mongoose.model('Comment', Comment);