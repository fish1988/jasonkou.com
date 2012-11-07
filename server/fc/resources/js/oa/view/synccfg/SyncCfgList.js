/**
 * @view FC.view.synccfg.SyncCfgList
 * @require FC.store.SyncCfgs 
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */

Ext.define('FC.view.synccfg.SyncCfgList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.synccfglist',
	id : 'SyncCfgList',
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
					title : '数据同步配置',
					store : 'SyncCfgs',
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [Ext.create('Ext.grid.RowNumberer'), {
								header : '数据同步配置名',
								dataIndex : 'f_sync_cfgname',
								sortable : true,
								flex : 2
							}, {
								header : '关联脚本',
								dataIndex : 'f_script_name',
								sortable : true,
								flex : 1
							}, {
								header : '源文件路径',
								dataIndex : 'f_src_filepath',
								sortable : true,
								flex : 1
							}, {
								header : '源文件机器IP',
								dataIndex : 'f_src_ip',
								sortable : true,
								flex : 1
							}, {
								header : '本地存放路径',
								dataIndex : 'f_local_path',
								sortable : true,
								flex : 1
							}, {
								header : '拉取/推送',
								dataIndex : 'f_push_pul',
								sortable : true,
								renderer : pushChange,
								flex : 1
							}, {
								header : '同步方式',
								dataIndex : 'f_sync_type',
								sortable : true,
								renderer : syncChange,
								flex : 1
							}, {
								header : '是否压缩',
								dataIndex : 'f_zip_type',
								sortable : true,
								renderer : yesChange,
								flex : 1
							}, {
								header : '文件保留周期(天)',
								dataIndex : 'f_save_cycle',
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
					items : Ext.widget('synccfgqueryform')
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
								store : 'SyncCfgs',
								dock : 'bottom',
								plugins : [Ext
										.create('Ext.ux.plugins.PageComboResizer')],
								displayInfo : true
							}]
				});

		me.callParent(arguments);
	}
});
