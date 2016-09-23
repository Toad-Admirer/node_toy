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

app.get('/del',function(req,res){
    Movie.fetch(function(err,movies){
        if(err) console.log(err);
        res.render('./demo/del.jade',{movies:movies});
    });
});

app.post('/del',function(req,res){
    var id =req.body.id;
    //console.log(id);
    if(id){
        Movie.remove({_id:id},function(err){
            if (err) {
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
})