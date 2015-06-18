/**
 * Created by Jade on 2015/6/18.
 */
var mongoose = require("mongoose");
var userSchema = require("../schema/user");
var UserModel = mongoose.model("user", userSchema);

var UserDto = function () {

}

UserDto.prototype.save = function (obj, callback) {
    var user = new UserModel(obj);
    user.save(function (err) {
        callback();
    });
}

module.exports = new UserDto();
