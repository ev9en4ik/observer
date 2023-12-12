const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const Genre = new Schema({
    name: { type: String },

})

module.exports = model('Genre', Genre)