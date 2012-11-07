var login = {}

login.index = function(req, res) {
	if (!req.session['userName'])
		res.render('login')
	else
		res.redirect('/index')
}

login.user = function(req, res) {
	log.debug(11, req.body)
	if (req.body.userName) {
		req.session['userName'] = req.body.userName
		res.cookie('user_login_name', req.body.userName, { maxAge: 900000, httpOnly: false})
		res.redirect('/mvc')
	} else {
		res.redirect('/login')
	}

}

module.exports = login