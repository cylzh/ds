/**
 * Created by jade on 2015/6/23.
 */

var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    title: {type: String},
    director: {type: String},
    intro: {type: String},
    create_date: {type: Date, default: Date.now()},
    publish_date: {type: Date},
    placard: {type: String},
    _user: {type: mongoose.Schema.ObjectId, ref: "user"}
})

module.exports = movieSchema;