var basePath = _path.join(__dirname, '../'), appPath = _path.join(basePath,
		'app/')

var config = {
	appName : 'jx',
	port : '8888',
	basePath : basePath,
	appPath : appPath,
	index : 'index',

	// log config
	logLevel : 'DEBUG',
	logPath : _path.join(basePath, 'logs/'),
	logOutPath : _path.join(basePath, 'logs/out/'),
	logErrPath : _path.join(basePath, 'logs/err/'),

	// app path
	modelPath : _path.join(appPath, 'model/'),
	ctrlPath : _path.join(appPath, 'controller/'),
	viewPath : _path.join(appPath, 'view/'),
	tplPath : _path.join(appPath, 'view/tpl/'),

	// upload/download
	// uploadPath : _path.join(basePath,'upload'),
	mvcTplPath : _path.join(appPath, 'util/build-mvc/JxTpl/app/'),
	downloadPath : _path.join(basePath, 'download/')

}

module.exports = config