var path = require('path'),
    connect = require('connect'),
	startupExpress = require('./startup/startup-express.js'),
	redisClient = require('./startup/startup-redis.js'),
	mysqlClient = require('./startup/startup-mysql.js'),
    app = require('express')();

var fileUploadCtrl=require('./controller/commons/fileUploadController.js');

startupExpress(app);

//express基本
app.get('/', function(req, res) {
    res.send('Hello World!');
});

//jade模板Render
app.get('/jade',function(req,res){
	res.render('demo');
});

//Multer文件上传
app.post('/dataInpute',fileUploadCtrl.dataInput);
