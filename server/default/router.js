// handle all controller request
_app.all(/\S/, function handleAllReq(req, res, next) {

			console.log(_url.parse(req.url).pathname)
			pathName = _url.parse(req.url).pathname
			pathName = pathName.substr(1)

			if (/^download/.test(pathName)) {
				// static handle
				staticFileHandle(_config.basePath+pathName, req, res)
				return
			}

			var session = req.session || {}
			if (!session['userName']) {
				if (pathName == '') {
					res.render('login')
					return
				} else if (pathName == 'login') {
					res.render('login')
					return
				}
			}

			if (!session['userName'] && pathName.indexOf('login') == -1) {
				res.redirect('/login')
				return
			}
			controllerHandle(pathName, req, res)

		})

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

var staticFileHandle = function(filePath, req, res) {

	// log.debug(filePath + ' is static');
	// log.debug(mime.lookup(filePath));

	_fs.exists(filePath, function(exists) {

				if (exists) {
					_fs.readFile(filePath, function(error, content) {
								if (error) {
									res.writeHead(500);
									res.end();
								} else {
									res.writeHead(200, {
												'Content-Type' : _mime
														.lookup(filePath)
											});
									res.end(content);
								}
							});
				} else {
					res.writeHead(404);
					res.end('request failed , cannot find file');
				}
			});

}