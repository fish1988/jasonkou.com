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

handle.redirect = function(viewName,res){
		_fs.readFile(_config.viewPath + viewName+'.html', function(err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading '+viewName+'.html')
				}
				res.end(data)
			})
}

// save form handle
handle.saveform = function(form) {
	log.debug('-->saveform');
	var objQuery = {};
	var strTpl = 'INSERT INTO %s SET %s ON DUPLICATE KEY UPDATE %s';

	var strTableName = form.table;

	var strcols = '';
	var arrVals = [];

	var arrKey = form.fields.keys; // keys
	var arrItem = form.fields.items; // items
	for (var i in arrKey) {
		var key = arrKey[i];
		for (var j in arrItem) {
			var name = arrItem[j].name;
			if (key == name && arrItem[j].mapping != undefined) {

				if (form.data[name].length > 0) {
					strcols += arrItem[j].mapping + '=?,';
					arrVals.push(form.data[name]);
				}
			}
		}
	}
	objQuery.table = strTableName;
	objQuery.sql = _util.format(strTpl, strTableName, strcols.substr(0,
					strcols.length - 1), strcols.substr(0, strcols.length - 1));

	objQuery.data = _comb.array.flatten(arrVals, arrVals);

	log.debug(objQuery);
	return objQuery;
}

// query form handle
handle.queryConditions = function(form) {
	log.debug('-->queryform');
	log.debug(form.data);

	var objQuery = {};
	var strQuery = '';
	var pageQuery = '';

	var arrKey = form.fields.keys; // keys
	var arrItem = form.fields.items; // items
	for (var i in arrKey) {
		var key = arrKey[i];
		for (var j in arrItem) {
			var name = arrItem[j].name;
			if (key == name && arrItem[j].mapping != undefined) {

				if (form.data[name].length > 0) {
					if (arrItem[j].operator == undefined
							|| arrItem[j].operator.length < 1) {
						continue;
					}

					if (strQuery.length > 0)
						strQuery += ' AND ';
					if (arrItem[j].operator == 'IN'
							|| arrItem[j].operator == 'NOT_IN') {
						strQuery += arrItem[j].mapping
								+ OPERATOR[arrItem[j].operator].replace('{0}',
										'\'' + form.data[name].join('\',\'')
												+ '\'');
					} else {

						strQuery += arrItem[j].mapping
								+ OPERATOR[arrItem[j].operator].replace('{0}',
										form.data[name]);
					}
				}
			}
		}
	}

	if (strQuery.length > 0) {
		strQuery = 'WHERE ' + strQuery;
	}

	// orderby direction limit pageSize
	var orderBy = form.get(_page.orderBy);
	var direction = form.get(_page.dir);
	var pageSize = form.get(_page.limit);
	var start = form.get(_page.start);
	if (start == undefined) {
		start = 0;
	}
	if (pageSize == undefined) {
		pageSize = 10;// ~~
	}
	if (direction == undefined) {
		direction = 'ASC';// ~~
	}

	if (orderBy != undefined) {
		var orderCol = '';
		for (var i in arrItem) {
			if (arrItem[i].name == orderBy) {
				orderCol = arrItem[i].mapping;
			}
		}

		strQuery += ' ORDER BY ' + orderCol + ' ' + direction;

	}
	pageQuery += ' limit ' + start + ',' + pageSize;

	log.debug(strQuery);

	objQuery.query = strQuery;
	objQuery.page = pageQuery;
	return objQuery;

}

// form validate
handle.validate = function(form) {
	log.debug('-->validate');
	log.debug(form.validate());
	if (form.validate().length != 0) {
		res.writeHead(200, {
					'Content-Type' : _mime.lookup('.json')
				});
		res.end('{success:false,msg:"校验失败"}');
	}
}

// operate result
handle.operRes = function(res, err) {
	res.writeHead(200, {
				'Content-Type' : _mime.lookup('.json')
			});
	if (err == null || err == undefined) {
		res.end('{success:true}');
	} else {
		res.end('{success:false,msg:\"' + err + '"}');
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
		res.end('{success:false,msg:\"' + err + '"}');
	}
}

module.exports = handle;