/**
 * Created by Jade on 2015/6/18.
 */

var mongoose = require("mongoose");
var path = require("path");

var UserSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String},
    avatar: {type: String, default: path.normalize("/upload/user/default.jpg")},
    createDate: {type: Date, default: Date.now()}
});

module.exports = UserSchema;