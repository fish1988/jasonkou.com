// handle all request
_app.all(/\S/, function handleAllReq(req, res, next) {

			console.log(_url.parse(req.url).pathname)
			// static files
			var staticRegex = /^app\/view\//, htmlRegex = /\.html?$/

			pathName = _url.parse(req.url).pathname
			pathName = pathName.substr(1)

			if (pathName == '') {
				res.redirect('/login')
				return
			} else if (pathName == 'login') {
				staticFileHandle(_config.viewPath + 'login.html', req, res)
				return
			}

			if (pathName.indexOf('socket.io') != -1) {
				staticFileHandle(pathName, req, res)
				return
			}
			// static file handle
			if (staticRegex.test(pathName)) {
				if (htmlRegex.test(pathName)) {
					var session = req.session || {}
					if (!session['userName']) {
						res.redirect('/login')
						return
					}
				}
				staticFileHandle(pathName, req, res)
			}// controller handle
			else {
				var session = req.session || {}
				if (!session['userName'] && pathName.indexOf('login') == -1) {
					res.redirect('/login')
					return
				}
				controllerHandle(pathName, req, res)
			}

		})

var staticFileHandle = function(filePath, req, res) {

	_fs.exists(filePath, function(exists) {

				if (exists) {
					_fs.readFile(filePath, function(error, content) {
								if (error) {
									res.writeHead(500)
									res.end()
								} else {
									res.writeHead(200, {
												'Content-Type' : _mime
														.lookup(filePath)
											})
									res.end(content)
								}
							})
				} else {
					res.writeHead(404)
					res.end('request failed , cannot find file')
				}
			})

}

var controllerHandle = function(ctrlPath, req, res) {
	var pathArr = ctrlPath.split('/'), ctrlName = pathArr[0], methodName = pathArr[1], findCtrl = false

	// default ctrl
	if (ctrlName == undefined || ctrlName.length < 1) {
		ctrlName = _config.index
	}
	// default method
	if (methodName == undefined || methodName.length < 1) {
		methodName = _config.index
	}

	log.debug('ctrlName: ' + ctrlName)
	log.debug('methodName: ' + methodName)
	try {
		var controller = require(_config.ctrlPath + ctrlName + '.js')

		controller[methodName](req, res)
	} catch (err) { // error
		log.err(err)
		res.writeHead(404, {
					'Content-Type' : 'text/plain'
				})
		res.end('err details: ' + err)

	}
}