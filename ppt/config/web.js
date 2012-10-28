var basePath = _path.join(__dirname, '../'), appPath = _path.join(basePath,
		'app/')

var config = {
	appName : 'ppt',
	port : '8080',
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
	viewPath : _path.join(appPath, 'view/')
}

module.exports = config