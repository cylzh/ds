/**
 * Created by jade on 2015/6/24.
 */

exports.index = function (req, res) {

    res.render("editor/index");
}

exports.content = function (req, res) {
    setTimeout(function(){
        res.render("editor/content");
    },3000)

}