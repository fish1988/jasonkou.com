var login = {},_userId = 1

login.index = function(req, res) {
	_handle.redirect('login',res)
}

login.userlogin = function(req, res) {
	log.debug(req.body)
	if (req.body.pwd == 'jasonkou') {
		req.session['uerId'] = _userId++
		req.session['userName'] = req.body.userName
		log.debug(req.session)
		res.redirect('/ppt')
	} else {
		res.redirect('/login')
	}

}

module.exports = login