var setting = require("../settings/settings.js");
var pool = require("mysql").createPool(setting.mysql);
var log4js = require("./startup-log4js.js");
var mysqlLogger = log4js.getLogger('mysql');

mysqlLogger.info('mysql-connection-initialized');

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
                if (qerr) mysqlLogger.error('mysql-query-error: ' + qerr);
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

// query('SELECT * from test', function(err, rows, fields) {
//   if (err) console.log(err);
// 	rows.forEach(function(val){
// 		console.log(val.name);
// 	});
// });

module.exports = query;
