const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Comment = new Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    votes: {
        positive: { type: Number, default: 0 },
        negative: { type: Number, default: 0 },
    },
    timestamp: new Date(),
})

module.exports = model('Comment', Comment)
