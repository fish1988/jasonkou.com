J.control('{ctrlName}', {
			stores : ['{storeName}'],

			models : ['{modelName}'],

			views : ['{viewDir}.Edit', '{viewDir}.List'],

			init : function() {
				this.control(Ext.apply(J.actions, {
						// additional actions here

						}))
			}
		})