var app = require('express')(),
    //redisClient = require('./startup/startup-redis.js'),
    //mysqlClient = require('./startup/startup-mysql.js'),
    mongodbClient = require('./startup/startup-mongodb.js'),
    startupExpress = require('./startup/startup-express.js')(app),
    startupRouter = require('./startup/startup-router.js')(app);

var socketIo = require('./startup/startup-socketIo.js')(app);

app.get('/socket-io', function(req, res) {
    res.render('./demo/socket-io.jade');
});

//乔test
app.get('/', function(req, res) {
    res.render('./page/index.jade');
});
