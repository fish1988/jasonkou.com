// all handles for forms
// like query~save~validate~
// and send back responses
var handle = {};
OPERATOR = {
	// RANGE : 'BETWEEN {0} AND {1}',
	EQUAL : ' =\'{0}\' ',
	NOT_EQUAL : ' <>\'{0}\' ',
	GREAT : ' >\'{0}\' ',
	GREAT_EQUAL : ' >=\'{0}\' ',
	LESS : ' <\'{0}\' ',
	LESS_EQUAL : ' <=\'{0}\' ',
	LEFT_LIKE : ' LIKE %\'{0}\' ',
	LIKE : ' LIKE %\'{0}\'% ',
	RIGHT_LIKE : ' LIKE \'{0}\'% ',
	NOT_LIKE : ' NOT LIKE \'{0}\'% ',
	IN : ' IN ({0}) ',
	NOT_IN : ' NOT IN ({0}) '
};

handle.redirect = function(viewName, res) {
	_fs.readFile(_config.viewPath + viewName + '.html', function(err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading ' + viewName + '.html')
				}
				res.end(data)
			})
}

// save form handle
handle.saveform = function(model,data) {
	log.debug('-->saveform')
	var objQuery = {},
		strTpl = 'INSERT INTO %s SET %s ON DUPLICATE KEY UPDATE %s',
		strcols = '',
		arrVals = []

	for (var i in data) {
		var item = model[i]
		if (typeof item != 'undefined') {
			strcols += item.column + '=?,'
			arrVals.push(data[i])
		}
	}
	objQuery.table = model.tableName
	objQuery.sql = _util.format(strTpl, model.tableName, strcols.substr(0,
					strcols.length - 1), strcols.substr(0, strcols.length - 1))

	objQuery.data = _comb.array.flatten(arrVals, arrVals)

	log.debug(objQuery);
	return objQuery;
}

// query form handle
handle.queryConditions = function(model, query) {
	log.debug('-->queryform');
	log.debug(query);

	var objQuery = {};
	var strQuery = '';
	var pageQuery = '';

	for (var i in query) {
		var item = model[i], operator = 'EQUAL'
		if (typeof item != 'undefined') {
			if (strQuery.length > 0)
				strQuery += ' AND '
			if (typeof item.operator != 'undefined') {
				operator = item.operator
			}

			if (operator == 'IN' || operator == 'NOT_IN') {
				strQuery += item.column
						+ OPERATOR[operator].replace('{0}', '\''
										+ query[i].join('\',\'') + '\'')
			} else {
				console.log(item, item.column, OPERATOR[operator].replace(
								'{0}', query[i]))
				strQuery += item.column
						+ OPERATOR[operator].replace('{0}', query[i])
			}

		}
	}

	if (strQuery.length > 0) {
		strQuery = 'WHERE ' + strQuery;
	}

	// orderby direction limit pageSize
	var orderBy = query['sort'];
	var direction = query['dir'];

	var start = query['start'];
	var limit = query['limit'];
	if (typeof start == 'undefined') {
		start = 0;
	}
	if (typeof limit == 'undefined') {
		limit = 10;// ~~
	}
	if (typeof direction == 'undefined') {
		direction = 'ASC';// ~~
	}

	if (typeof orderBy != 'undefined') {
		var orderCol = '';
		if (typeof model[orderBy] != 'undefined')
			strQuery += ' ORDER BY ' + orderCol + ' ' + direction;

	}
	pageQuery += ' limit ' + start + ',' + limit;

	log.debug(strQuery);

	objQuery.query = strQuery;
	objQuery.page = pageQuery;
	return objQuery;

}

// form validate
handle.validate = function(model, query) {
	log.debug('-->validate');
	/*if (form.validate().length != 0) {
		res.writeHead(200, {
					'Content-Type' : _mime.lookup('.json')
				});
		res.end('{success:false,msg:"校验失败"}');
	}*/
}

// operate result
handle.operRes = function(res, err) {
	res.writeHead(200, {
				'Content-Type' : _mime.lookup('.json')
			});
	if (err == null || err == undefined) {
		res.end('{"success":true,"message":"success"}');
	} else {
		res.end('{"success:false","message":\"' + err + '"}');
	}
}

// data resoult
// success|msg|items|total
handle.dataRes = function(res, data, err) {
	res.writeHead(200, {
				'Content-Type' : _mime.lookup('.json')
			});
	if (err == null || err == undefined) {
		data.success = true;
		
		res.end(JSON.stringify(data));
	} else {
		res.end('{"success":false,"message":"' + err + '"}');
	}
}

module.exports = handle;