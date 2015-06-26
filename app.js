/**
 * Module dependencies.
 */

var express = require('express');
var router = require("./config/router");
var http = require('http');
var path = require('path');
var con = require("consolidate");
var mongoose = require("./lib/mongodb");
var multiparty = require("connect-multiparty");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine(".html", con.swig)
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.json());
app.use(express.urlencoded());
app.use(multiparty({uploadDir: "./public/upload/"}));

app.use(express.methodOverride());

app.use(express.cookieParser())
app.use(express.session({
    key: "ds_id",
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    secret: "secret"
}))

//优先匹配路由减少io开销
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

router(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
