const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const Actor = new Schema({
    image: {
        type: String,
    },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    born: {
        date: { type: Date, required: true },
        location: { type: String, default: null },
    },
    died: { type: Date, default: null },
    married: {
        marriedOn: { type: String, default: null },
        marriedAt: { type: Date, default: null },
    },
    brokeUpAt: { type: Date, default: null },
    parents: {
        father: { type: String, default: null },
        mother: { type: String, default: null },
    },
    roles: { type: [String], default: [] },
    shortInfo: {
        type: String,
    },
})

module.exports = model('Actor', Actor)
