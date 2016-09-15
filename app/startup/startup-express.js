var favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    log4js = require("./startup-log4js.js"),
    settings = require('../settings/settings.js'),
    express = require('express');
//以下路径调用的地方在app.js环境下  所以路径为./xxx
module.exports = function(app) {
    app.set('views', './views');
    app.set('view engine', 'jade');
    app.use(favicon('./public/images/favicon/favicon.ico'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());

    app.use(session({
        secret: 'smartQiaoZhen',
        key: 'DARKSESSIONID', //cookie name
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30 //30 days
        },
        store: new MongoStore({
            url: settings.mongodb.url
        }),
        resave: false,
        saveUninitialized: true
    }));

	var expressLogger = log4js.getLogger("express");

    app.use(log4js.connectLogger(expressLogger, {
        level: log4js.levels.INFO
    }));

    app.listen(3000, function() {
        expressLogger.info('App listening at ' + 3000);
    });
    app.use(express.static('./public'));
	return app;
}
