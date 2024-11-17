const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: { type: String, required: true }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
