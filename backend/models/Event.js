// Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: {
        lat: Number,
        lng: Number
    },
    description: String
});

module.exports = mongoose.model('Event', eventSchema);
