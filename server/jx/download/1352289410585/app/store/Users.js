J.store('Users', {
			model : 'User',
			proxy : {
				api : {
					query : 'user/list.html',
					edit : 'user/save.html',
					invalid : 'user/invalid.html',
					excel : 'user/excel.html'
				}
			},
			sorters : [{
						property : 'lastModifyTime',
						direction : 'DESC'
					}]
		})