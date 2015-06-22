/**
 * Created by jade on 2015/6/22.
 */
var mongoose = require("../lib/mongodb");

var CustomerSchema = new mongoose.Schema({
    ctype: {type: String},
    name: {type: String},
    contactPerson: {type: String},
    phone: {type: String},
    avatar: {type: String}
});

module.exports = CustomerSchema;