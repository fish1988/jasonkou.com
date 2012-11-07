var WS = {}, ctrlWS = {}, ctrlUserWS = {}, users = {}, slides = {}, storeMemory = new _express.session.MemoryStore(), parseCookie = _cookie.parse

_sio.set('authorization', function(handshakeData, callback) {
			// 通过客户端的cookie字符串来获取其session数据
			handshakeData.cookie = parseCookie(handshakeData.headers.cookie);
			var connect_sid = handshakeData.cookie['connect.sid'];

			if (connect_sid) {
				storeMemory.get(connect_sid, function(error, session) {
							if (error) {
								// if we cannot grab a session, turn down the
								// connection
								console.log('authorization Error====>', error);
								callback(error.message, false);
							} else {
								// save the session data and accept the
								// connection
								handshakeData.session = session;
								console
										.log('   authorization =============> success');
								callback(null, true);
							}
						});
			} else {
				callback('nosession');
			}
		})

_sio.of('/ppt').on('connection', function(r) {
	return function(socket) {
		console.log('         socket=========================>' + r);
		var session = socket.handshake.session || {};
		var uid = session['userId'], uname = session['userName']

		if (!uid || !uname) {
			return;
		}
		if (unqUser(r, uname)) {
			users[r].push(session[r]);
		}
		var wsIndex = r + uid;
		WS[wsIndex] && delete WS[wsIndex];
		WS[wsIndex] = socket;

		socket.on('disconnect', function() {
					if (ctrlWS[r]) {
						delUser(r, uname);
						ctrlWS[r].emit('user list', {
									users : users[r]
								});
						// delete ctrlWS[r];
					}
				});

		socket.on('ppt progress', function(data) {
					console.log('ppt progress==========================', data);
					ctrlWS[r] && ctrlWS[r].emit('ppt progress', data);

				});

		socket.on('ppt slide list', function(data) {
					ctrlWS[r] && ctrlWS[r].emit('ppt slide list', data);
					slides[r] = data;
				});

		if (ctrlWS[r]) {

			ctrlWS[r].emit('user list', {
						users : users[r]
					});

			slides[r] && ctrlWS[r].emit('ppt slide list', slides[r]);
		}

	}
}('/ppt'))

_sio.of('/ctrl').on('connection', function(socket) {
			console.log(' socket=========================>ctrl');

			var session = socket.handshake.session || {};// session
			var pptid = session.ctrlPPTID || 0;
			console.log('======================>', pptid);

			if (pptid) {
				ctrlWS[pptid] && delete ctrlWS[pptid];
				ctrlWS[pptid] = socket;
			} else {
				return 'Error: ctrl no session';
			}
			socket.on('ctrl users', function(data) {
						// console.log(data);
						ctrlUserWS[pptid] = data.uids;
					});

			socket.on('ctrl ppt action', function(data) {
						// console.log('ctrl ppt action=============>', data);
						// console.log('ctrl ppt action=============>',
						// ctrlUserWS[pptid]);

						if (ctrlUserWS[pptid]) {
							ctrlUserWS[pptid].forEach(function(id) {

										// console.log(WS[pptid + id]);
										WS[pptid + id].emit('ppt do', data);
									});
						}
					});

			socket.on('ctrl ppt progress', function(data) {
						// console.log('ctrl progress===============>',data);

						if (ctrlUserWS[pptid]) {
							ctrlUserWS[pptid].forEach(function(id) {
										// console.log(WS[pptid + id]);
										WS[pptid + id].emit('ppt progress do',
												data);
									});
						}
					});

			ctrlWS[pptid] && ctrlWS[pptid].emit('user list', {
						users : users[pptid]
					});

			slides[pptid]
					&& ctrlWS[pptid].emit('ppt slide list', slides[pptid]);
		});
