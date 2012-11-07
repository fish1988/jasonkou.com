var fs = require('fs');

var dataSql = fs.readFileSync('./db_ii.sql').toString();

var comment = /\/\*[\s\S]*?\*\//gi, reg = /create\s+table[^;]+;/gi, word = /[_a-z0-9\(\)\u4e00-\u9fa5]+/gi, word_2 = /[_a-z0-9\u4e00-\u9fa5]+/gi, key = /\r\n[^,]*(\s+KEY\s+)+.+(\,|\))/gi, column = /\r\n(?!.+(KEY\s+).+).+(\,|\))/gi;

var tableArr = [], tableNameArr = [], tableColumnArr = [], tableColumnObj = [], tableKeyArr = [], tableKeyObj = [];

dataSql = dataSql.replace(comment, '');

tableArr = dataSql.match(reg);
for (var i in tableArr) {
	tableNameArr.push(tableArr[i].match(word)[2]); // 3rd word
	tableColumnArr.push(tableArr[i].match(column)); // columns
	tableKeyArr.push(tableArr[i].match(key)); // key
}

for (var i in tableColumnArr) {
	tableColumnObj[i] = [];
	for (var j in tableColumnArr[i]) {
		var properties = tableColumnArr[i][j].match(word);
		var column = {
			name : properties[0],
			type : properties[1]

		};
		if (/COMMENT/gi.test(properties[properties.length - 2]))
			column.desc = properties[properties.length - 1];

		tableColumnObj[i].push(column);
	}
}

for (var i in tableKeyArr) {
	// tableKeyObj[i] = [];
	var key = {};
	for (var j in tableKeyArr[i]) {
		var properties = tableKeyArr[i][j].match(word_2);
		if (/PRIMARYKEY/gi.test(properties[0] + properties[1]))
			key.primaryKey = properties[2];
		if (/FOREIGNKEY/gi.test(properties[2] + properties[3])) {
			key['' + properties[4]] = properties[6] + '.' + properties[7];
		}
	}
	tableKeyObj.push(key);
}
// console.log(tableKeyObj);
// console.log(tableColumnObj);
/*console.log(tableNameArr);
console.log(tableColumnArr);
console.log(tableKeyArr );*/
var res = {
	tableNames : tableNameArr,
	columns : tableColumnObj,
	keys : tableKeyObj
};
// console.log(res);
module.exports = res;
/*
function trim(){
	return this.replace(/(^\s*)(\s*$)/g, '');
}*/