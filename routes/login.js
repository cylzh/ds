/**
 * Created by jade on 2015/6/22.
 */
var user = require("../model/user");
var adminUser = require("../config/adminUser");

exports.index = function (req, res) {
    res.render("login")
}

exports.login = function (req, res) {
    var body = req.body;
    var name = body.name;

    if (!name || !body.password) {
        req.flash("error", "用户名或密码不能为空！");
        return;
    }

    var isAdminLogin = false;
    adminUser.forEach(function (item) {
        if (item.userName == name && item.password == body.password) {
            req.session.user = item;
            isAdminLogin = true;
            return;
        }
    });
    if (isAdminLogin) {
        return res.redirect("/");
        return;
    }

    user.find({userName: name}, function (userObj) {
        if (userObj.length > 0 && userObj[0].password == body.password) {
            req.session.user = userObj[0];
            return res.redirect("/");
        } else {
            req.flash("error", "用户名或密码不正确");
            return res.redirect("/login");
        }
    })
}

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect("/login");
}