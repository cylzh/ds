/**
 * Created by Jade on 2015/6/18.
 */

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {type: String}
});

module.exports = UserSchema;