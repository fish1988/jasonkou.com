J.store('{storeName}', {
			model : '{modelName}',
			proxy : {
				api : {
					query : '{viewDir}/list.html',
					edit : '{viewDir}/save.html',
					invalid : '{viewDir}/invalid.html',
					excel : '{viewDir}/excel.html'
				}
			},
			sorters : [{
						property : 'lastModifyTime',
						direction : 'DESC'
					}]
		})