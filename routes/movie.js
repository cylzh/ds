/**
 * Created by jade on 2015/6/23.
 */
var movie = require("../model/movie");
var path = require("path");
var fs = require("fs");

exports.list = function (req, res) {

    var ps = req.query.ps || 10;
    var pn = req.query.pn || 1;
    var q = req.query.q;

    var searchParams = {
        ps: ps,
        pn: pn,
        q: null
    };

    movie.pagdResult(searchParams, function (pagedResult) {
        res.render("movie/list", {
            movieList: pagedResult.movieList,
            totalPages: pagedResult.totalPages,
            pn: pn,
            ps: ps
        });
    })

};

exports.add = function (req, res) {
    var movieM = req.body;
    var user = req.session.user;
    movieM._user = user._id;

    upload(req, function (target) {
        movieM.placard = target;
        movie.save(movieM, function (err, obj) {
            res.redirect("/movie");
        })
    })
}

exports.detial = function (req, res) {
    var id = req.params.id;
    movie.findById(id, function (movieDto) {
        res.render("movie/detial", {movie: movieDto});
    })
}


function upload(req, callback) {
    var files = req.files;

    if (files.placard.size > 0) {
        var target = path.join("/upload/movie", files.placard.name);
        fs.rename(files.placard.path, path.join("./public", target), function (err) {
            if (!err) {
                callback(target);
            }
        });
    } else {
        fs.unlink(file.placard.path, function (err) {
            //var target = "/public/upload/user/default";
            callback(err, path.normalize(target));
        });
    }
}

