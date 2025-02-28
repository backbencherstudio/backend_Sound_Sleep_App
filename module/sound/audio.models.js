const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    imagePath: { type: String, required: true },
    audioPath: { type: String, required: true }
});

module.exports = mongoose.model('Sound', soundSchema); 