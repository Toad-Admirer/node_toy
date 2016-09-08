var path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    log4js = require("log4js"),
    settings = require('../settings/settings.js');
//以下路径调用的地方在app.js环境下  所以路径为./logs
// -------------------------日志中间件-----------------------------
log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: './logs/express.log',
        category: 'express'
    }]
});
// -------------------------- END --------------------------------
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
            url: settings.mongodbUrl
        }),
        resave: false,
        saveUninitialized: true
    }));

    app.use(log4js.connectLogger(log4js.getLogger("express"), {
        level: log4js.levels.INFO
    }));

	app.listen(3000, function() {
	    console.log('App listening at ' + 3000);
	});

}
