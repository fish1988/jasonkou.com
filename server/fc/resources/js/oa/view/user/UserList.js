/**
 * @view FC.view.user.UserList
 * @require FC.store.Users 
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */

Ext.define('FC.view.user.UserList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	id : 'UserList',
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
					title : '用户管理',
					store : 'Users',
					columns : [Ext.create('Ext.grid.RowNumberer'), {
								header : '用户名',
								dataIndex : 'f_user_name',
								sortable : true,
								flex : 1,
								editor : {
									xtype : 'textfield',
									allowBlank : false
								}
							}, {
								header : '用户类型',
								dataIndex : 'f_user_type',
								sortable : true,
								editor : {
									xtype : 'combo',
									store : new Ext.data.SimpleStore({
												fields : ['name', 'id'],
												data : [['A', '1'],
														['B', '2'],
														['C', '3']]
											}),
									emptyText : '请选择...',
									valueField : 'id', // option.value
									typeAhead : true,
									hiddenName : "id",
									displayField : 'name', // option.text
									triggerAction : 'all',
									mode : 'local',
									editable : true,
									forceSelection : true,
									typeAhead : true
								},
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
								flex : 1
							}],
					selType : 'rowmodel',
					plugins : [Ext.create('Ext.grid.plugin.RowEditing', {
								clicksToEdit : 1
							})],
					dockedItems : [{
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
											icon : 'resources/images/icons/f5.png'
										}]
							}, {
								xtype : 'pagingtoolbar',
								store : 'Users',
								dock : 'bottom',
								plugins : [Ext
										.create('Ext.ux.plugins.PageComboResizer')],
								displayInfo : true
							}]
				});

		me.callParent(arguments);
	}
});