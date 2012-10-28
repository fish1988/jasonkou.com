_app.configure(function() {
			_app.use(_log4js.connectLogger(_log4js.getLogger(_config.appName),
					{
						level : 'DEBUG'
					}))
			_app.use(_express.favicon(_config.viewPath + 'img/favicon.ico'))
			_app.use(_express.bodyParser())
			_app.use(_express.methodOverride())
			_app.use(_express.cookieParser())
			_app.use(_express.session({
						secret : 'jasonkou'
					}))
			_app.use(_express.errorHandler({
						dumpExceptions : true,
						showStack : true
					}))
		})
