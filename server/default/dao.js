// insert/update table by form obj
// invalidate/validate/delete table rows by keys

// INSERT INTO t_test VALUES(1,'aaa') ON DUPLICATE KEY UPDATE
// t_id=1,t_name='aaaa'

// select [fields] from table by [conditions]
// remote sort --

// jsonvo
var mysql = require('mysql');
var connection = mysql.createConnection(_dbConfig.mysqlLocal);

var dao = {};

dao.dsMap = {};

dao.showTables = function(connId, cb) {
	console.time('show tables');

	var conn;
	_async.waterfall([function(callback) {

		if (dao.dsMap[connId] != undefined) {
			callback(null, dao.dsMap[connId]);
			return;
		}
		connection.query(
				// base table--> WHERE table_type = \'BASE TABLE\'
				'SELECT * FROM t_db_cfg WHERE f_conn_id=?', [connId], function(
						err, rows, fields) {
					log.debug(rows[0]);
					var cfg = {
						host : rows[0].f_ip,
						port : rows[0].f_port,
						user : rows[0].f_user_name,
						password : rows[0].f_pwd,
						database : rows[0].f_db_name
					};
					dao.dsMap[connId] = cfg;
					callback(null, cfg);
				});

	}, function(arg1, callback) {
		log.debug(arg1);
		var testConn = mysql.createClient(arg1);
		log.debug(testConn);
		testConn.query('SHOW FULL TABLES', function(err, rows, fields) {
					log.debug(rows);

					for (var i in rows) {
						rows[i].id = rows[i]['Tables_in_' + arg1.database]
					}
					cb(rows, err);
				});

	}]);

}

dao.list = function(model, query, pagable, cb) {

	try {
		console.time('dao list');

		var objectQuery = _handle.queryConditions( model,query);
		log.debug(objectQuery);

		var totalSql = 'select count(*) total from ' + model.tableName
				+ ' as t_jx_ ' + objectQuery.query;

		var selectCols = []
		selectCols.push('select')
		for(var i in model){
			if(i!='tableName' && i!='primaryKey' && i!='hasOne' && i!='hasMany'){
				selectCols.push(model[i].column)
				selectCols.push(i == 'desc'? '\'desc\'':i)
				selectCols.push(',')
			}
		}
		selectCols.pop()
		selectCols.push('from ')
		var itemSql = selectCols.join(' ') + model.tableName + ' as t_jx_ '
				+ objectQuery.query;

		// pagable
		if (pagable == true) {
			itemSql += objectQuery.page;
		}
		log.debug('totalSql : ' + totalSql);
		log.debug('itemSql : ' + itemSql);
		// parallel functions
		_async.parallel({
					total : function(callback) {

						connection.query(totalSql, function(err, results,
										fields) {
									if (err) {
										log.err(err);
									} else {
										log.debug(results);
										callback(null, results[0].total);
									}

								});

					},
					items : function(callback) {
						connection.query(itemSql,
								function(err, results, fields) {
									if (err) {
										log.err(err);
									} else {
										log.debug(results);
										callback(null, results);
									}

								});

					}
				},
				// optional callback
				function(err, results) {
					console.log(results);
					cb(results, err);

					console.timeEnd('dao list');
				});

	} catch (e) {
		cb(null, e);
	}
}

dao.save = function(model,data, cb) {

	var objQuery = _handle.saveform(model,data)

	console.time('dao save');
	connection.query(objQuery.sql, objQuery.data, function(err) {

				if (err) {
					log.err(err);
					cb(err);
				} else {
					cb();
				}
				console.timeEnd('dao save');
			});

}

module.exports = dao;