var setting = require('../settings/settings.js');
var log4js = require("./startup-log4js.js");
var redis = require("redis"),
    client = redis.createClient(setting.redis.port, setting.redis.host);
var redisLogger = log4js.getLogger('redis');

	client.on('connect', function() {
	    redisLogger.info('redis-connection-initialized');
	});

	client.on("error", function (err) {
	    redisLogger.error("redis-error: " + err);
	});

module.exports = client;
