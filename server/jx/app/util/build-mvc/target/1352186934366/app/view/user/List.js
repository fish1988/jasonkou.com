/**
 * user list view 
 * 
 * layout:
 *     -----------
 *     |query form  -[i] [i] [s] [i]   [b]
 *     |                        
 *     -----------
 *     |grid
 */
J.view('user.UserQueryForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.userqueryform',
			initComponent : function() {
				var me = this
				Ext.apply(me, {
							defaultType : 'textfield',
							defaults : {
								emptyText : '请输入...'
							},
							border : false,
							layout : {
								type : 'table',
								columns : 5
							},
							items : [{
										name : 'userName',
										fieldLabel : '名称'
									}, {
										xtype : 'checkbox',
										fieldLabel : '状态',
										name : 'status',
										width : 110,
										inputValue : 1,
										uncheckedValue : 0,
										checked : true
									}, {
										xtype : 'button',
										width : 65,
										style : 'margin-left:40px;',
										text : '查询',
										action : 'query'
									}, {
										xtype : 'button',
										width : 65,
										style : 'margin-left:20px;',
										text : '重置',
										action : 'reset'
									}]
						})

				me.callParent(arguments)
			}
		})

J.view('user.List', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.userlist',
			initComponent : function() {
				var me = this
				Ext.apply(me, {
							title : '用户管理',
							rowId : 'userId',
							dblClick : 'edit',
							store : 'Users',
							selModel : Ext
									.create('Ext.selection.CheckboxModel'),
							columns : {
								defaults : {
									sortable : false
								},
								items : [{
											xtype : 'rownumberer',
											width : 37
										}, {
											header : '序号',
											dataIndex : 'userId',
											hidden : true
										}, {
											header : '名称',
											dataIndex : 'userName',
											flex : 1
										}, {
											header : '创建人',
											dataIndex : 'createUser',
											sortable : true,
											flex : 1
										}, {
											header : '创建时间',
											dataIndex : 'createTime',
											sortable : true,
											flex : 1
										}, {
											header : '修改人',
											dataIndex : 'lastModifyUser',
											sortable : true,
											flex : 1
										}, {
											header : '修改时间',
											dataIndex : 'lastModifyTime',
											sortable : true,
											flex : 1
										}, {
											header : '描述',
											dataIndex : 'desc'
										}, {
											header : '状态',
											dataIndex : 'status'
										}]
							},

							dockedItems : [{
										xtype : 'container',
										dock : 'top',
										items : Ext
												.widget('userqueryform')
									}, {
										xtype : 'toolbar',
										dock : 'top',
										items : [{
													text : '添加',
													action : 'add',
													target : 'useredit'
												}, {
													text : '编辑',
													action : 'edit',
													target : 'useredit'
												}, {
													text : '无效',
													action : 'invalid'
												}, {
													text : '导出',
													action : 'excel'
												}, {
													text : '刷新',
													action : 'f5'
												}]
									}, {
										xtype : 'pagingtoolbar',
										store : 'Users',
										dock : 'bottom',
										plugins : [
												Ext.create('Ext.ux.PageCombo'),
												Ext
														.create('Ext.ux.SlidingPager')],
										displayInfo : true
									}]
						})
				me.callParent(arguments)
			}
		})