// server default
var serverDefaultPath = '../default/'

// lib include
require('./config/lib.js')

// based on express
_app = _express()

// base web app config
_config = require('./config/web.js') 

// db config
_dbConfig = require('./config/db.js')

// db tools
_dao = require(serverDefaultPath + 'dao.js') // dao

// app logs
_log = log = require(serverDefaultPath + 'log.js') // log
// app middleware/router
require(serverDefaultPath + 'middleware.js') // app middleware
require(serverDefaultPath + 'router.js') // app router

// server
_server = require('http').createServer(_app)
// listen
_server.listen(_config.port)

// form handler
_handle = require(serverDefaultPath + 'formhandle.js')

// config debug
log.debug(_config)
log.info('server is listening @ localhost:' + _config.port)