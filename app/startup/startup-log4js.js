var log4js = require("log4js");
//以下路径调用的地方在app.js环境下  所以路径为./logs
// -------------------------日志中间件-----------------------------
log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: './logs/express.log',
        category: 'express',
		maxLogSize : 20480
    }, {
        type: 'file',
        filename: './logs/mysql.log',
        category: 'mysql',
		maxLogSize : 20480
    }, {
        type: 'file',
        filename: './logs/redis.log',
        category: 'redis',
		maxLogSize : 20480
    }]
});
// -------------------------- END --------------------------------

module.exports = log4js;
