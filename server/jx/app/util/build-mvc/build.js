var build = {}

build.mvc = function(modelName, fields, tplDir, targetDir, cb) {

	var fs = require('fs')
	var zip = require('node-native-zip')

	var input = {
		modelName : modelName,
		fields : fields
	}

	var modelName = input.modelName
	var inputConfig = {
		modelName : modelName,
		ctrlName : modelName + 's',
		storeName : modelName + 's',
		viewDir : modelName.toLowerCase(),
		fieldsArr : JSON.stringify(input.fields.split(';')).replace(/"/g, '\'')
	}

	// tpl
	// var tplDir = 'JxTpl/app/'
	var tplConfig = {
		model : tplDir + 'model/Jx.js',
		ctrl : tplDir + 'controller/Jxs.js',
		store : tplDir + 'store/Jxs.js',
		edit : tplDir + 'view/jx/Edit.js',
		list : tplDir + 'view/jx/List.js'
	}

	// output
	var timeStamp = new Date().getTime()
	var outputDir = targetDir + timeStamp + '/', outputApp = outputDir + 'app/'
	var outputConfig = {
		outputDir : outputDir,
		outputApp : outputApp,
		modelDir : outputApp + 'model/',
		storelDir : outputApp + 'store/',
		ctrlDir : outputApp + 'controller/',
		viewDir : outputApp + 'view/',
		cViewDir : outputApp + 'view/' + inputConfig.viewDir,

		model : outputApp + 'model/' + inputConfig.modelName + '.js',
		ctrl : outputApp + 'controller/' + inputConfig.ctrlName + '.js',
		store : outputApp + 'store/' + inputConfig.storeName + '.js',
		edit : outputApp + 'view/' + inputConfig.viewDir + '/Edit.js',
		list : outputApp + 'view/' + inputConfig.viewDir + '/List.js'
	}

	// replace tpl names
	function replaceName(str) {
		/*var res = str
		for (i in inputConfig) {
			res = res.replace(new RegExp('\{' + inputConfig[i] + '\}', 'g'),
					inputConfig[i])
		}*/
		var res = str.replace(/\{modelName\}/g, inputConfig.modelName).replace(
				/\{storeName\}/g, inputConfig.storeName).replace(
				/\{ctrlName\}/g, inputConfig.ctrlName).replace(/\{viewDir\}/g,
				inputConfig.viewDir).replace(/\{fieldsArr\}/g,
				inputConfig.fieldsArr)
		// console.log(res)
		return res
	}

	console.log('=======================================> mkdirs')
	// clear

	// mkdirs
	for (i in outputConfig) {
		console.log(i, outputConfig[i])

		if (outputConfig[i].indexOf('.js') == -1) {
			fs.mkdirSync(outputConfig[i])
		}

	}

	console.log('=======================================> build')
	// build file
	for (i in tplConfig) {
		var data = fs.readFileSync(tplConfig[i], 'utf8')
		fs.writeFileSync(outputConfig[i], replaceName(data), 'utf8')
	}

	console.log('=======================================> zip')
	var archive = new zip()
	archive.addFiles([{
						name : 'model/' + inputConfig.modelName + '.js',
						path : outputConfig.model
					}, {
						name : 'controller/' + inputConfig.ctrlName + '.js',
						path : outputConfig.ctrl
					}, {
						name : 'store/' + inputConfig.storeName + '.js',
						path : outputConfig.store
					}, {
						name : 'view/' + inputConfig.viewDir + '/Edit.js',
						path : outputConfig.edit
					}, {
						name : 'view/' + inputConfig.viewDir + '/List.js',
						path : outputConfig.list
					}], function(err) {
				if (err)
					return console.log("err while adding files", err);

				var buff = archive.toBuffer();

				fs.writeFile(targetDir + timeStamp + '.zip', buff, function() {
							console.log("Finished");
							if (typeof cb != 'undefined')
								cb('download/' + timeStamp + '.zip')
						})
			})

}

module.exports = build
