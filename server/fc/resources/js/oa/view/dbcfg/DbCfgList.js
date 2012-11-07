/**
 * @view FC.view.dbcfg.DbCfgList
 * @require FC.store.DbCfgs 
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */

Ext.define('FC.view.dbcfg.DbCfgList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.dbcfglist',
	id : 'DbCfgList',
	initComponent : function() {
		var me = this;

		Ext.apply(me, {
					title : 'DB配置',
					store : 'DbCfgs',
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [Ext.create('Ext.grid.RowNumberer'), {
								header : '连接名',
								dataIndex : 'f_conn_name',
								sortable : true,
								flex : 2
							}, {
								header : '连接IP',
								dataIndex : 'f_ip',
								sortable : true,
								flex : 1
							}, {
								header : '端口号',
								dataIndex : 'f_port',
								sortable : true,
								flex : 1
							}, {
								header : 'DB名称',
								dataIndex : 'f_db_name',
								sortable : true,
								flex : 1
							}, {
								header : 'DB类型',
								dataIndex : 'f_db_type',
								sortable : true,
								renderer : dbChange,
								flex : 1
							}, {
								header : '用户名',
								dataIndex : 'f_user',
								sortable : true,
								flex : 1
							}, {
								header : '密码',
								dataIndex : 'f_password',
								sortable : true,
								flex : 1
							}, {
								header : '字符集',
								dataIndex : 'f_charset',
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
					items : Ext.widget('dbcfgqueryform')
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
								store : 'DbCfgs',
								dock : 'bottom',
								plugins : [Ext
										.create('Ext.ux.plugins.PageComboResizer')],
								displayInfo : true
							}]
				});

		me.callParent(arguments);
	}
});

/**
 * statusChange 
 * 
 * bool -> css string
 * @param {} value
 * @return {String}
 */
function statusChange(val) {
	if (val) {
		return '<span style="color:green;">有效</span>';
	} else {
		return '<span style="color:red;">无效</span>';
	}
	return val;
}

/**
 * yes/no Change 
 * 
 * bool -> css string
 * @param {} value
 * @return {String}
 */
function yesChange(val) {
	if (val) {
		return '<span style="color:green;">是</span>';
	} else {
		return '<span style="color:red;">否</span>';
	}
	return val;
}

/**
 * push/pull Change 
 * 
 * bool -> css string
 * @param {} value
 * @return {String}
 */
function pushChange(val) {
	if (val == 1) {
		return '<span style="color:green;">本机主动拉取</span>';
	} else {
		return '<span style="color:red;">源机器推送</span>';
	}
	return val;
}

/**
 * db Change 
 * 
 * bool -> css string
 * @param {} value
 * @return {String}
 */
function dbChange(val) {
	if (val == 1) {
		return '<span style="color:green;">MySql</span>';
	} else {
		return '<span style="color:red;">Oracle</span>';
	}
	return val;
}

/**
 * sync  Change
 * 
 * bool -> css string
 * @param {} value
 * @return {String}
 */
function syncChange(val) {
	if (val == 1) {
		return 'rsync';
	} else if (val == 2) {
		return 'scp';
	} else if (val == 3)
		return 'ftp';
	return val;
}
