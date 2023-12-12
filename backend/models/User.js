const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const User = new Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    ratedMovies: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
            },
            rating: Number,
        },
    ],
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
        },
    ],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = model('User', User)
