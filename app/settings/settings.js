module.exports = {
    mongodb: {
		url : 'mongodb://localhost/movie'
	},
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
	mysql : {
		host : 'localhost',
		database : 'seckill',
		port : 3306,
		user : 'root',
		password : 'xu,19920328.',
		connectionLimit : 50
	},
    ffmpeg : {
        screenshotsDuration : 30
    }
};
