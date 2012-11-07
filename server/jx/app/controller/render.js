var render = {}, Render = require('../model/Render.js')

render.index = function(req, res) {
	res.render('dict/render', {
				query : 'render/list',
				edit : 'render/save',
				invalid : 'render/invalid'
			})
}

render.list = function(req, res) {
	log.debug('render.list')
	var query = req.body
	// list
	_dao.list(Render, query, true, function cb(data, err) {
				_handle.dataRes(res, data, err)// callback function
			})
}

render.save = function(req, res) {
	log.debug('render.save')
	var data = req.body
	// save
	_dao.save(Render,data, function cb(err) {
				_handle.operRes(res, err)// callback function
			})
}

module.exports = render