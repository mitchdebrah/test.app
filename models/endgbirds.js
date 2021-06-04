const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    population: {type: Number, required: true},
    native: {type: String, required: true}
});

const Birdes = mongoose.model('bird', birdSchema);

module.exports = Birdes;


