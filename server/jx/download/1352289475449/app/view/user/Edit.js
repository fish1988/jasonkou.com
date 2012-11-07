J.view('user.Edit', {
			extend : 'Ext.window.Window',
			alias : 'widget.useredit',
			modal : true,
			title : '添加',
			layout : 'fit',
			autoShow : false,
			height : 320,
			width : 400,

			initComponent : function() {
				this.items = [{
							xtype : 'form',
							padding : '5 5 0 5',
							border : false,
							style : 'background-color: #fff;',
							defaultType : 'textfield',

							items : [{
										xtype : 'hidden',
										name : 'userId'
									}, {
										name : 'userName',
										fieldLabel : '名称'
									}, {
										xtype : "textarea",
										fieldLabel : '描述',
										name : 'desc'
									}, {
										xtype : 'checkbox',
										checked : true,
										inputValue : 1,
										uncheckedValue : 0,
										fieldLabel : '状态',
										name : 'status'
									}]
						}]

				this.buttons = [{
							text : '保存',
							action : 'save'
						}, {
							text : '取消',
							action : 'cancel'
						}]

				this.callParent(arguments)
			}
		})
