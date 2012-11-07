/**
 * @class FC.controller.DbCfgCtrl 
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.controller.DbCfgCtrl', {
	extend : 'Ext.app.Controller',
	stores : ['DbCfgs'],
	models : ['DbCfg'],
	views : ['dbcfg.DbCfgList', 'dbcfg.DbCfgEdit'],
	refs : [{
				ref : 'list',
				selector : 'dbcfglist'
			}, {
				ref : 'edit',
				selector : 'dbcfgedit'
			}],

	init : function() {
		var me = this;
		me.url = Jx + 'db';
		me.control({
			'dbcfglist' : {
				afterrender : function(gp) {
					var listUrl = me.url + '&cmd=list';
					// var listUrl = 'resources/js/data/dbcfg.json';
					// init
					loadMaskShow();
					me.getDbCfgsStore().proxy.url = listUrl;

					me.getDbCfgsStore().load({
								callback : function() {
									loadMaskHide();
								}
							});
					// f5
					gp.down('button[action=f5]').on('click', function() {
								var store = me.getDbCfgsStore();
								store.removeAll();
								store.load({
											url : listUrl
										});
							});
					// query

					// add
					gp.down('button[action=add]').on('click', function() {
								Ext.widget('dbcfgedit').show();
							});

					// edit win
					gp.down('button[action=edit]').on('click', function() {
						var record = me.getList().getSelectionModel()
								.getSelection();

						if (record == null || record.length == 0) {
							Ext.Msg.alert("提示", "请选择记录");
							return;
						}

						var win = Ext.widget('dbcfgedit');
						var form = win.down('form').getForm();
						var record = me.getList().getSelectionModel()
								.getSelection()[0];
						form.loadRecord(record);
						form.findField('f_conn_name').setReadOnly(true);
						win.show();
					});

					// show edit win [double click]
					gp.on('celldblclick', function() {
								var win = Ext.widget('dbcfgedit');
								var form = win.down('form').getForm();
								var record = me.getList().getSelectionModel()
										.getSelection()[0];
								form.loadRecord(record);
								form.findField('f_conn_name').setReadOnly(true);
								win.show();
							});

					// del
					gp.down('button[action=del]').on('click', function() {
						var records = me.getList().getSelectionModel()
								.getSelection();

						if (records == null || records.length == 0) {
							Ext.Msg.alert("提示", "请选择记录");
							return;
						}
						var recordIdArray = new Array(records.length);
						for (var i = 0; i < records.length; i++) {

							recordIdArray[i] = records[i].get('f_conn_name');
						}
						var recordIds = recordIdArray.join(',');
						Ext.MessageBox.confirm('提示', '确认删除 ' + recordIds + '?',
								function(btn) {
									if (btn != 'yes')
										return;

									Ext.Ajax.request({
										waitMsg : '正在删除...',
										url : me.url + '&cmd=delete&ids='
												+ recordIds,
										method : 'POST',
										success : function(response) {
											var obj = Ext
													.decode(response.responseText);
											if (obj.success == true) {
												Ext.Msg.alert("提示", "操作成功");
												me.getDbCfgsStore().load();

											} else
												Ext.Msg.alert('提示', '操作失败');
										}
									});
								});
					});
					// excel
				}
			},
			// ------------------------
			// edit view
			'dbcfgedit button[action=save]' : {
				click : function() {
					var editForm = me.getEdit().down('form').getForm();

					if (editForm.isValid()) {

						editForm.submit({
									waitMsg : '正在保存...',
									url : me.url + '&cmd=save',
									method : 'POST',
									success : function(form, action) {
										Ext.Msg.alert('提示', "保存成功");
										me.getEdit().close();
										me.getDbCfgsStore().load();
									},
									failure : function(form, action) {
										Ext.Msg
												.alert(
														'提示',
														MessageCode[action.result.message]);
									}
								});
					}
				}
			}
		});

	}
});
