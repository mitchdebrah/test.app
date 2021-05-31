const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean,
});

// This is the line that actually creates the collection in mongo
// The collection is the first parameter lowercased and pluralized.
const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;