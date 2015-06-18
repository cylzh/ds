/**
 * Created by Jade on 2015/6/18.
 */

var routes = require("../routes");

module.exports = function (app) {

    app.get("/", routes.index);

}