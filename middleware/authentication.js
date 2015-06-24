/**
 * Created by jade on 2015/6/23.
 */

//登陆限制
exports.login = function (req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.redirect("/login");
}

