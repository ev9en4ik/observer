const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Movie = new Schema({
    title: { type: String },
    type: { type: String, required: true },
    episodes: {
        seasons: { type: Number, required: false },
        episodes: { type: Number, required: false },
    },
    image: { type: String, default: null },
    trailer: {
        type: String,
    },
    rating: {
        count: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 },
    },
    date: {
        released: { type: Boolean, default: false },
        date: { type: Date },
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
    },
    country: {
        type: String,
    },
    genre: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
        },
    ],
    duration: {
        type: Number,
    },
    mpaa: { type: String, default: 'G' },
    actors: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Actor',
            },
            role: String,
        },
    ],
    storyline: { type: String },
    socialNetwork: {
        facebook: String,
        instagram: String,
        twitter: String,
        imdb: String,
    },
    keywords: [String],
    videos: { type: [String], default: [] },
    images: { type: [String], default: [] },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

module.exports = model('Movie', Movie)
