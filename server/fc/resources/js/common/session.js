

Ext.util.Observable.observeClass(Ext.data.Connection);
// beforerequest handle
Ext.data.Connection.on('beforerequest', function(conn, options, o) {

/*			console.log(options);
			console.log('-----------------');
			console.log('-----------------');*/
			if (options.form != undefined)
				options.form.from = 'extjs';
			else if (options.params != undefined)
				options.params.from = 'extjs';
			else if (options.url != undefined) {
				if (options.url.indexOf('?') == -1)
					options.url += '?from=extjs';
				else
					options.url += '&from=extjs';
			}
		});

// session handle
Ext.data.Connection.on('requestcomplete', function(conn, resp, options) {
			//console.log('---------session_timeout test--------');

			if (resp && resp.responseText == 'session_timeout') {

				// use login tag
				Ext.Msg.alert('提示', '会话过期，重新登录系统', function(btn) {
							location.href = 'index.php';
						});
			}

		});

// error handle
Ext.data.Connection.on('requestexception', function(conn, resp, options) {
			Ext.Msg.alert('提示', '系统内部错误，请联系管理员');
		});