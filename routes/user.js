/**
 * Created by jade on 2015/6/22.
 */
var user = require("../model/user");
var fs = require("fs");
var path = require("path");

exports.list = function (req, res) {
    var pageN = req.query.pn || 1;
    var pageS = req.query.ps || 10;


    var searchParam = {
        limit: pageS,
        skip: (pageN - 1) * pageS
    };

    user.pagedReult(searchParam, function (pagedResult) {
        res.render("user", {
            title: "用户列表",
            userList: pagedResult.list,
            totalPages: pagedResult.totalPages,
            pn: pageN,
            colNum: (pageN - 1) * pageS
        });
    })
}

exports.add = function (req, res) {
    var userModel = req.body;

    upload(req, function (err, target) {
        if (!err) {
            userModel.avatar = target
            user.save(userModel, function (err) {
                if (!err) {
                    res.redirect("/user");
                }
            })
        }
    })

}

exports.update = function (req, res) {
    var id = req.params.id;
    var userModel = req.body;
    user.update(id, userModel, function (err, result) {
        if (!err) {
            return res.redirect("/user");
        }
    })
}

exports.del = function (req, res) {
    var id = req.params.id;

    user.del(id, function (err) {
        res.redirect("/user");
    })
}

function upload(req, callback) {
    var files = req.files;

    if (files.file.size > 0) {
        var target = path.join("/upload/user", files.file.name);
        fs.rename(files.file.path, path.join("./public", target), function (err) {
            callback(err, target);
        });
    } else {
        fs.unlink(file.file.path, function (err) {
            var target = "/public/upload/user/default";
            callback(err, path.normalize(target));
        });
    }
}

