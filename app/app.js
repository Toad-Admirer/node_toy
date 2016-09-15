var path = require('path'),
    connect = require('connect'),
	startupExpress = require('./startup/startup-express.js'),
	//redisClient = require('./startup/startup-redis.js'),
	//mysqlClient = require('./startup/startup-mysql.js'),
	upload = require('./startup/startup-multer.js'),
    app = require('express')();

startupExpress(app);


//乔test
app.get('/qiaozhen',function(res,res){
    res.render('./page/index.jade')
})

//express基本
app.get('/', function(req, res) {
    res.send('Hello World!');
});

//jade模板Render
app.get('/jade',function(req,res){
	res.render('./demo/demo.jade');
});

app.get('/file',function(req,res){
	res.render('./demo/fileUpload.jade');
});


//Multer文件上传
app.post('/singleUpload', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  console.log(req.body);
  res.end("aaaaaa");
});

app.post('/multiUpload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.files);
  console.log(req.body);
  //res.end(req.file + "<br/><br/>" + req.body);
  res.end("bbbbbbb");
});
