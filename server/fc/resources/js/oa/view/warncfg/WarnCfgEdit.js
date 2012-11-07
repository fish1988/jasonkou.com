/**
 * @view FC.view.warncfg.WarnCfgEdit
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.view.warncfg.WarnCfgEditForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.warncfgeditform',
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
										name : 'f_warncfg_name',
										fieldLabel : '告警配置名',
										emptyText : '请输入...',
										regex : /^[a-zA-Z0-9_]+$/,
										regexText : '格式不正确，只能由字母数字和下划线组成'
									}, {
										name : 'f_serv_type',
										fieldLabel : '业务类型',
										emptyText : '请输入...'
									}, {
										name : 'f_warn_type',
										fieldLabel : '告警类型',
										emptyText : '请输入...'
									}, {
										name : 'f_receiver',
										fieldLabel : '接收人列表',
										emptyText : '请输入...',
										regex : /(\w+;)*\w+(;)?$/,
										regexText : '格式不正确，多个接收人请用;分隔'

									}, {
										xtype : 'checkbox',
										inputValue : '1',
										uncheckedValue : '0',
										fieldLabel : '邮件通知',
										name : 'f_mail'
									}, {
										xtype : 'checkbox',
										inputValue : '1',
										uncheckedValue : '0',
										fieldLabel : 'RTX通知',
										name : 'f_rtx'
									}, {
										xtype : 'checkbox',
										inputValue : '1',
										uncheckedValue : '0',
										fieldLabel : '短信通知',
										name : 'f_sms'
									}, {
										name : 'f_delay_strategy',
										fieldLabel : '延时策略(小时)',
										xtype : 'numberfield',
										value : 0,
										maxValue : 99,
										minValue : 0
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

Ext.define('FC.view.warncfg.WarnCfgEdit', {
			extend : 'Ext.window.Window',
			alias : 'widget.warncfgedit',
			title : '告警配置',
			autoShow : false,
			height : 320,
			width : 340,
			layout : 'fit',

			initComponent : function() {
				var me = this;
				me.items = Ext.widget('warncfgeditform');
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