var setting = require("../settings/settings.js");
var pool = require("mysql").createPool(setting.mysql);
var log4js = require("./startup-log4js.js");
var mysqlLogger = log4js.getLogger('mysql');

pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1');
  mysqlLogger.info('mysql-connected');
});

//连接池阻塞时,日志记录
pool.on('enqueue', function() {
    mysqlLogger.info('Waiting for available connection slot');
});

var query = function(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            mysqlLogger.error('mysql-connect-error: ' + err);
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                //释放连接
                conn.release();
				if(qerr) mysqlLogger.error('mysql-query-error: ' + qerr);
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = query;
