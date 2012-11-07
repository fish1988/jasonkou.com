/**
 * @view FC.view.warncfg.WarnCfgList
 * @require FC.store.WarnCfgs 
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */

Ext.define('FC.view.warncfg.WarnCfgList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.warncfglist',
	id : 'WarnCfgList',
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
					title : '告警配置',
					store : 'WarnCfgs',
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [Ext.create('Ext.grid.RowNumberer'), {
								header : '告警配置名',
								dataIndex : 'f_warncfg_name',
								sortable : true,
								flex : 2
							}, {
								header : '业务类型',
								dataIndex : 'f_serv_type',
								sortable : true,
								flex : 1
							}, {
								header : '告警类型',
								dataIndex : 'f_warn_type',
								sortable : true,
								flex : 1
							}, {
								header : '接收人列表',
								dataIndex : 'f_receiver',
								sortable : true,
								flex : 1
							}, {
								header : '是否邮件通知',
								dataIndex : 'f_mail',
								sortable : true,
								renderer : yesChange,
								flex : 1
							}, {
								header : '是否RTX通知',
								dataIndex : 'f_rtx',
								sortable : true,
								renderer : yesChange,
								flex : 1
							}, {
								header : '是否短信通知',
								dataIndex : 'f_sms',
								sortable : true,
								renderer : yesChange,
								flex : 1
							}, {
								header : '延时策略（小时）',
								dataIndex : 'f_delay_strategy',
								sortable : true,
								flex : 1
							}, {
								header : '创建时间',
								dataIndex : 'f_create_time',
								sortable : true,
								flex : 1
							}, {
								header : '创建人',
								dataIndex : 'f_create_user',
								sortable : true,
								flex : 1
							}, {
								header : '修改时间',
								dataIndex : 'f_modify_time',
								sortable : true,
								flex : 1
							}, {
								header : '修改人',
								dataIndex : 'f_modify_user',
								sortable : true,
								flex : 1
							}, {
								header : '状态',
								dataIndex : 'f_status',
								sortable : true,
								flex : 1,
								renderer : statusChange
							}],
					dockedItems : [/*{
					xtype : 'container',
					dock : 'top',
					items : Ext.widget('warncfgqueryform')
					}, */{
								xtype : 'toolbar',
								dock : 'top',
								items : ['-', {
											xtype : 'button',
											text : '添加',
											icon : 'resources/images/icons/add.png',
											action : 'add'
										}, '-', {
											xtype : 'button',
											text : '修改',
											icon : 'resources/images/icons/edit.png',
											action : 'edit'
										}, '-', {
											xtype : 'button',
											text : '删除',
											icon : 'resources/images/icons/delete.png',
											action : 'del'
										}, '-', {
											xtype : 'button',
											text : '刷新',
											icon : 'resources/images/icons/f5.png',
											action : 'f5'
										}]
							}, {
								xtype : 'pagingtoolbar',
								store : 'WarnCfgs',
								dock : 'bottom',
								plugins : [Ext
										.create('Ext.ux.plugins.PageComboResizer')],
								displayInfo : true
							}]
				});

		me.callParent(arguments);
	}
});
