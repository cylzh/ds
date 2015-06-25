/**
 * Created by Jade on 2015/6/18.
 */

var routes = require("../routes");
var user = require("../routes/user");
var login = require("../routes/login");
var movie = require("../routes/movie");
var editor = require("../routes/editor");
var authentication = require("../middleware/authentication");

module.exports = function (app) {

    //login
    app.get("/login", login.index);
    app.post("/login", login.login);
    app.get("/logout", login.logout);

    app.get("/", authentication.login, routes.index);


    //user crud
    app.get("/user", authentication.login, user.list);
    app.post("/user/add", authentication.login, user.add);
    app.post("/user/del/:id", authentication.login, user.del);
    app.post("/user/update/:id", authentication.login, user.update);

    //movie
    app.get("/movie", authentication.login, movie.list);
    app.post("/movie/add", authentication.login, movie.add);
    app.get("/movie/detial/:id", authentication.login, movie.detial);

    //editor
    app.get("/editor", editor.index);
    app.get("/editor/content", editor.content);
    app.post("/editor/article", editor.article);
    app.get("/editor/uEditorHandler", editor.uEditorHandler);
    app.post("/editor/uEditorHandler", editor.uEditorHandler);

}