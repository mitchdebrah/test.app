const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    img: String,
    video: String,
    likes: {type: Number, required: true},
    subscribers: {type: Number, required: true}
});

const Yvideos = mongoose.model('ytvideo', videoSchema);

module.exports = Yvideos;