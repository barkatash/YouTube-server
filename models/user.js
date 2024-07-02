const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String,
        require: true
    },
    displayName : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    image : {
        type: String
    },
    videoIdListLiked : {
        type: [Number],
        default: []
    },
    videoIdListUnliked : {
        type: [Number],
        default: []
    },
    commentIdListLiked : {
        type: [Number],
        default: []
    },
    commentIdListUnliked : {
        type: [Number],
        default: []
    },
});
module.exports = mongoose.model('User', User);