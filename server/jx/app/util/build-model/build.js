var parse = require('parse.js');
var fs = require('fs');

var fileFolder = 'ii/';
	
	
var replaceName = function(a,tag){
	var b='';
	var arr = a.split('_');
	for(var i = 1; i<arr.length;i++){
		
		if(i==1 && tag) b+=arr[i];
		else b+= arr[i].replace(arr[i].charAt(0),arr[i].charAt(0).toUpperCase());

	}
	return b;
}

var builder = function(){
	fs.mkdir(fileFolder);
	var fileName = '';
	var hasMany = {},
		hasOne = {};
	
	for(var i = 0; i<parse.tableNames.length;i++){
		var keys = parse.keys[i];
		for(var j in keys){
			if(j!='primaryKey'){
				var two = keys[j].split('.');
				var tableNameA = replaceName(parse.tableNames[i]);
				var tableNameB = replaceName(two[0]);
				var column = replaceName(two[1],true);
				if(hasMany[tableNameB] == undefined){
					hasMany[tableNameB] = [];
				}
				//console.log(hasMany[tableName]);
				hasMany[tableNameB].push({model: tableNameA ,from:column,to:replaceName(j,true)});
				
				if(hasOne[tableNameA] == undefined){
					hasOne[tableNameA] = [];
				}
				hasOne[tableNameA].push({model: tableNameB ,from:replaceName(j,true),to:column});
				
			}
		}
	}
	
	//console.log(hasMany);console.log(hasOne);
	
	for(var i = 0 ; i<parse.tableNames.length;i++){
		fileName = replaceName(parse.tableNames[i]);
		
		var obj = {}; 
		obj['tableName'] = parse.tableNames[i]
		
		var key = parse.keys[i];
		if(key.primaryKey){
				obj.primaryKey = replaceName(key.primaryKey,true);
			}
		
		if(hasOne[fileName] !== undefined){
			obj.hasOne = hasOne[fileName];
		}
		if(hasMany[fileName] !== undefined){
			obj.hasMany = hasMany[fileName];
		}
		for(var j = 0; j<parse.columns[i].length;j++){
			var col = (parse.columns)[i][j];
			//console.log(col);
			obj[replaceName(col.name,true)] = {type:col.type,desc:col.desc,column:col.name};
		}

		fs.writeFile(fileFolder+fileName+'.js','var '+fileName+' = \r\n'+formatJson(JSON.stringify(obj))+' \r\nmodule.exports='+fileName);
	}
	
}
//console.log(parse.keys);

// formatJson() :: formats and indents JSON string
function formatJson(val) {
	var retval = '';
	var str = val;
    var pos = 0;
    var strLen = str.length;
	var indentStr = '    ';
    var newLine = '\r\n';
	var char = '';
	
	for (var i=0; i<strLen; i++) {
		char = str.substring(i,i+1);
		
		if (char == '}' || char == ']') {
			retval = retval + newLine;
			pos = pos - 1;
			
			for (var j=0; j<pos; j++) {
				retval = retval + indentStr;
			}
		}
		
		retval = retval + char;	
		
		if (char == '{' || char == '[' || char == ',') {
			retval = retval + newLine;
			
			if (char == '{' || char == '[') {
				pos = pos + 1;
			}
			
			for (var k=0; k<pos; k++) {
				retval = retval + indentStr;
			}
		}
	}
	
	return retval;
}

builder();
//console.log(replaceName('f_column_name'));