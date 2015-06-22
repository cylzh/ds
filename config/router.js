/**
 * Created by Jade on 2015/6/18.
 */

var routes = require("../routes");
var user = require("../routes/user");

module.exports = function (app) {

    app.get("/", routes.index);


    //user
    app.get("/user", user.list);
    app.post("/user/add", user.add);
    app.post("/user/del/:id", user.del);
    app.post("/user/update/:id", user.update);

}