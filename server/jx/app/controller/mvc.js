var mvc = {}, build = require('../util/build-mvc/build.js')

mvc.index = function(req, res) {
	res.render('mvc', {
				build : '/mvc/build'
			})
}

mvc.build = function(req, res) {
	log.debug('mvc.build')
	var data = req.body
	// save

	// =============?????
	build.mvc(req.body.modelName, req.body.fields, _config.mvcTplPath, _config.downloadPath,
			function(path) {
				_handle.dataRes(res, {
							url : path
						})
			})
}

module.exports = mvc