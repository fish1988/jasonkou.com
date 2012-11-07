J.control('Users', {
			stores : ['Users'],

			models : ['User'],

			views : ['user.Edit', 'user.List'],

			init : function() {
				this.control(Ext.apply(J.actions, {
						// additional actions here

						}))
			}
		})