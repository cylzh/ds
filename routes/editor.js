/**
 * Created by jade on 2015/6/24.
 */
var fs = require("fs");
var path = require("path");
var async = require('async');

exports.index = function (req, res) {

    async.series({
        article: function (callback) {
            fs.readFile(path.normalize("./public/upload/editor/test.txt"), {encoding: "utf-8"}, function (err, data) {
                callback(err, data)
            })
        },
        label: function (callback) {
            fs.readFile(path.normalize("./public/upload/editor/test1.txt"), {encoding: "utf-8"}, function (err, data) {
                callback(err, data && JSON.parse(data));
            })
        }
    }, function (err, data) {
        res.render('editor/index', data);
    })
}

exports.content = function (req, res) {
    res.render("editor/content");
}

exports.article = function (req, res) {

    fs.writeFile(path.normalize("./public/upload/editor/test.txt"), req.body.content, function (err) {
        res.redirect("/editor");
    });
}

exports.label = function (req, res) {


    async.waterfall([
        function (cb) {
            fs.readFile(path.normalize("./public/upload/editor/test1.txt"), {encoding: "utf-8"}, function (err, data) {
                cb(err, data && JSON.parse(data));
            })
        },
        function (r, cb) {
            r || (r = []);
            r.push({
                "discription": req.body.discription,
                "endOffset": req.body.endOffset
            })
            fs.writeFile(path.normalize("./public/upload/editor/test1.txt"), JSON.stringify(r), function (err) {
                cb(err)
            });
        }], function (err) {
        res.redirect("/editor");
    })


}


exports.uEditorHandler = function (req, res) {
    var action = req.query.action;
    if (action == "config") {
        res.redirect("/lib/ueditor/config.json");
    } else if (action == "uploadimage") {
        var file = req.files.upfile;
        if (file.size > 0) {
            var target = path.join("./public/upload/editor/", file.name);
            var url = path.join("/upload/editor/", file.name)
            fs.rename(file.path, target, function (err) {
                res.send(JSON.stringify({
                    "originalName": file.name,
                    "name": file.name,
                    "url": url,
                    "title":file.name,
                    "state": "SUCCESS"
                }));
            });
        }
    }
}