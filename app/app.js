var app = require('express')(),
    redisClient = require('./startup/startup-redis.js'),
    mysqlClient = require('./startup/startup-mysql.js'),
    mongodbClient = require('./startup/startup-mongodb.js'),
    startupExpress = require('./startup/startup-express.js')(app),
    startupRouter = require('./startup/startup-router.js')(app);

//乔test
app.get('/qiaozhen', function(req, res) {
    res.render('./page/index.jade');
});
