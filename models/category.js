const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    categoryId: {
        type: Number,
        require: true,
        unique: true
    },
    categoryName: {
        type: String,
        require: true,
        unique: true
    }
});
module.exports = mongoose.model('Category', Category);