/*
 * GET home page.
 */


var user = require("../model/user");

exports.index = function (req, res) {
    /*user.save({name: "ddsoma"}, function () {


    })*/

    res.render('index', {title: '首页'});
};

