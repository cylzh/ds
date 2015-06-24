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

UserDto.prototype.find = function (obj, callback) {
    UserModel.find(obj, function (err, dtos) {
        var userList = [];
        if (!err) {
            userList = dtos;
        }
        callback(userList);
    });
}

UserDto.prototype.update = function (id, update, callback) {
    UserModel.findByIdAndUpdate(id, update, function (err, obj) {
        callback(err, obj);
    })
}

UserDto.prototype.del = function (id, callback) {
    UserModel.findByIdAndRemove(id, function (err) {
        callback(err);
    })
}

UserDto.prototype.pagedReult = function (searchParams, callback) {
    var pagedResult = {
        list: [],
        totalPages: 0
    }
    var query = UserModel.find(null).sort({createDate: -1}).skip(searchParams.skip).limit(searchParams.limit)
    query.exec(function (err, result) {
        if (!err) {
            pagedResult.list = result;
        }
        UserModel.count(function (err, count) {
            if (!err) {
                pagedResult.totalPages = Math.ceil(count / searchParams.limit);
            }
            callback(pagedResult)
        })
    })
}

module.exports = new UserDto();
