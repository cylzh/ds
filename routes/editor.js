/**
 * Created by jade on 2015/6/24.
 */
var fs = require("fs");
var path = require("path");

exports.index = function (req, res) {
    fs.readFile(path.normalize("./public/upload/editor/test.txt"), {encoding: "utf-8"}, function (err, data) {
        res.render("editor/index", {article: data});
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
                    "state": "SUCCESS"
                }));
            });
        }
    }
}