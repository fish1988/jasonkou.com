/**
 * @view FC.view.dbcfg.DbCfgEdit
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.view.dbcfg.DbCfgEditForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.dbcfgeditform',
			initComponent : function() {
				var me = this;

				Ext.apply(me, {
							frame : true,
							bodyStyle : 'padding:5 10 5 5',

							defaultType : 'textfield',
							defaults : {
								blankText : '不允许为空',
								labelAlign : 'right',
								allowBlank : false
							},
							items : [{
										xtype : 'displayfield',
										html : '<br>'
									}, {
										name : 'f_conn_name',
										fieldLabel : '连接名',
										emptyText : '请输入...',
										regex : /^[a-zA-Z0-9_]+$/,
										regexText : '格式不正确，只能由字母数字和下划线组成'
									}, {
										name : 'f_ip',
										fieldLabel : '连接IP',
										emptyText : '请输入...'
									}, {
										name : 'f_port',
										fieldLabel : '端口号',
										emptyText : '请输入...',
										regex : /^\d+$/,
										regexText : '只能是数字'
									}, {
										name : 'f_db_name',
										fieldLabel : 'DB名称',
										emptyText : '请输入...'
									}, {
										xtype : 'radiogroup',
										fieldLabel : 'DB类型',
										items : [{
													boxLabel : 'MySql',
													name : 'f_db_type',
													inputValue : 1,
													checked : true
												}, {
													boxLabel : 'Oracle',
													name : 'f_db_type',
													inputValue : 2
												}]
									}, {
										name : 'f_user',
										fieldLabel : '用户名',
										emptyText : '请输入...'
									}, {
										name : 'f_password',
										fieldLabel : '密码',
										allowBlank : true
									}, {
										name : 'f_charset',
										fieldLabel : '字符集',
										emptyText : '请输入...'
									}, {
										xtype : 'checkbox',
										checked : true,
										inputValue : '1',
										uncheckedValue : '0',
										fieldLabel : '状态',
										name : 'f_status'
									}]
						});

				me.callParent(arguments);
			}
		});

Ext.define('FC.view.dbcfg.DbCfgEdit', {
			extend : 'Ext.window.Window',
			alias : 'widget.dbcfgedit',
			title : 'DB配置',
			autoShow : false,
			height : 340,
			width : 340,
			layout : 'fit',

			initComponent : function() {
				var me = this;
				me.items = Ext.widget('dbcfgeditform');
				me.buttons = [{
							text : '保存',
							icon : 'resources/images/icons/save.png',
							action : 'save'
						}, {
							text : '重置',
							icon : 'resources/images/icons/reset.png',
							handler : function() {
								me.down('form').getForm().reset();
							}

						}, {
							text : '取消',
							icon : 'resources/images/icons/cancel.png',
							handler : function() {
								me.close();
							}
						}];
				me.callParent(arguments);
			}
		});