/**
 * Created by jade on 2015/6/23.
 */
module.exports = function () {

    return function (req, res, next) {

        var _render = res.render;

        res.render = function (view, locals, callback) {

            locals || (locals = {});

            if (typeof locals == "function") {
                callback = locals;
                locals = {};
            }

            locals.user = req.session.user;

            var error = req.flash("error").toString();

            locals.error = error;

            _render.call(this, view, locals, callback);
        }

        next();
    }
}