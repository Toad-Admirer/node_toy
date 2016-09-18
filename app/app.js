var app = require('express')(),
    //redisClient = require('./startup/startup-redis.js'),
    //mysqlClient = require('./startup/startup-mysql.js'),
    mongodbClient = require('./startup/startup-mongodb.js'),
    startupExpress = require('./startup/startup-express.js')(app),
    startupRouter = require('./startup/startup-router.js')(app);

var socketIo = require('./startup/startup-socketIo.js')(app);


var Movie = require('./dao/mongodb/model/Movie.js');

app.get('/socket-io', function(req, res) {
    res.render('./demo/socket-io.jade');
});

//乔test
app.get('/', function(req, res) {
    Movie.listByPagination(0,10,function(err,movies){
        if(err) console.log(err);
        res.render('./page/index.jade',{movies:movies});
    });
});
