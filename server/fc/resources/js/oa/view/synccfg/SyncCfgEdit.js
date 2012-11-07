/**
 * @view FC.view.synccfg.SyncCfgEdit
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.view.synccfg.SyncCfgEditForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.synccfgeditform',
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
										name : 'f_sync_cfgname',
										fieldLabel : '数据同步配置名',
										emptyText : '请输入...',
										regex : /^[a-zA-Z0-9_]+$/,
										regexText : '格式不正确，只能由字母数字和下划线组成'
									}, {
										name : 'f_script_name',
										fieldLabel : '关联脚本名称',
										allowBlank : true
									}, {
										name : 'f_src_filepath',
										fieldLabel : '源文件路径',
										emptyText : '请输入...'
									}, {
										name : 'f_src_ip',
										fieldLabel : '源文件机器IP',
										emptyText : '请输入...'
									}, {
										name : 'f_local_path',
										fieldLabel : '本地路径',
										emptyText : '请输入...'
									}, {
										xtype : 'radiogroup',
										fieldLabel : '拉取/推送',
										items : [{
													boxLabel : '本机拉取',
													name : 'f_push_pul',
													inputValue : 1,
													checked : true
												}, {
													boxLabel : '源机推送',
													name : 'f_push_pul',
													inputValue : 2
												}]
									}, {
										xtype : 'radiogroup',
										fieldLabel : '同步方式',
										items : [{
													boxLabel : 'rsync',
													name : 'f_sync_type',
													inputValue : 1,
													checked : true
												}, {
													boxLabel : 'scp',
													name : 'f_sync_type',
													inputValue : 2
												}, {
													boxLabel : 'ftp',
													name : 'f_sync_type',
													inputValue : 3
												}]
									}, {
										xtype : 'checkbox',
										name : 'f_zip_type',
										checked : true,
										inputValue : '1',
										uncheckedValue : '0',
										fieldLabel : '是否压缩'

									}, {
										name : 'f_save_cycle',
										fieldLabel : '保留周期(天)',
										xtype : 'numberfield',
										value : 7,
										maxValue : 99,
										minValue : 1
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

Ext.define('FC.view.synccfg.SyncCfgEdit', {
			extend : 'Ext.window.Window',
			alias : 'widget.synccfgedit',
			title : '数据同步配置',
			autoShow : false,
			height : 360,
			width : 350,
			layout : 'fit',

			initComponent : function() {
				var me = this;
				me.items = Ext.widget('synccfgeditform');
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