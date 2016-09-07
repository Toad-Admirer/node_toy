var path = require('path'),
    favicon = require('serve-favicon'),
    express = require('express'),
    connect = require('connect'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
	log4js = require("log4js"),
    app = express();
var settings = require('./settings/settings.js');

// -------------------------日志中间件-----------------------------
log4js.configure({
 appenders: [
   { type: 'console' },
   { type: 'file', filename: 'express.log', category: 'express' }
  ]
});
app.use(log4js.connectLogger(log4js.getLogger("express"), {level: log4js.levels.INFO}));
// -------------------------- END --------------------------------


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
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
	resave : false,
	saveUninitialized : true
}));

app.listen(3000, function() {
    console.log('App listening at ' + 3000);
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/jade',function(req,res){
	res.render('demo');
});
