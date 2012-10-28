// use datetime log
var dateStr = _comb.date.format(new Date(), 'yyyyMMdd')
var infoLogPath = _config.logOutPath + 'logout' + dateStr + '.log'
var errLogPath = _config.logErrPath + 'logerr' + dateStr + '.log'

// mkdirs
if (!_fs.exists(_config.logOutPath)) {
	_fs.mkdir(_config.logOutPath)
}
if (!_fs.exists(_config.logErrPath)) {
	_fs.mkdir(_config.logErrPath)
}

_log4js.addAppender(_log4js.fileAppender(infoLogPath), _config.appName)
_log4js.addAppender(_log4js.fileAppender(errLogPath), _config.appName + '-err')

var logOut = _log4js.getLogger(_config.appName)
var logErr = _log4js.getLogger(_config.appName + '-err')

logOut.setLevel(_config.logLevel)
logErr.setLevel('ERROR')

var log = {
	debug : function(str) {
		logOut.debug(str)
	},
	info : function(str) {
		logOut.info(str)
	},
	err : function(str) {
		logErr.error(str)
	},
	fatal : function(str) {
		logErr.fatal(str)
	}
}
module.exports = log
