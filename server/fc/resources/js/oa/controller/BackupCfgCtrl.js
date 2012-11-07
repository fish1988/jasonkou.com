/**
 * @class FC.controller.BackupCfgCtrl 
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.controller.BackupCfgCtrl', {
	extend : 'Ext.app.Controller',
	stores : ['BackupCfgs'],
	models : ['BackupCfg'],
	views : ['backupcfg.BackupCfgList', 'backupcfg.BackupCfgEdit'],
	refs : [{
				ref : 'list',
				selector : 'backupcfglist'
			}, {
				ref : 'edit',
				selector : 'backupcfgedit'
			}],

	init : function() {
		var me = this;
		me.url = Jx + 'backup';
		me.control({
			'backupcfglist' : {
				afterrender : function(gp) {
					var listUrl = me.url + '&cmd=list';
					// var listUrl = 'resources/js/data/backupcfg.json';
					// init
					loadMaskShow();
					me.getBackupCfgsStore().proxy.url = listUrl;

					me.getBackupCfgsStore().load({
								callback : function() {
									loadMaskHide();
								}
							});
					// f5
					gp.down('button[action=f5]').on('click', function() {
								var store = me.getBackupCfgsStore();
								store.removeAll();
								store.load({
											url : listUrl
										});
							});
					// query

					// add
					gp.down('button[action=add]').on('click', function() {
								Ext.widget('backupcfgedit').show();
							});

					// edit win
					gp.down('button[action=edit]').on('click', function() {
						var record = me.getList().getSelectionModel()
								.getSelection();

						if (record == null || record.length == 0) {
							Ext.Msg.alert("提示", "请选择记录");
							return;
						}

						var win = Ext.widget('backupcfgedit');
						var form = win.down('form').getForm();
						var record = me.getList().getSelectionModel()
								.getSelection()[0];
						form.loadRecord(record);
						form.findField('f_backup_cfgname').setReadOnly(true);
						win.show();
					});

					// show edit win [double click]
					gp.on('celldblclick', function() {
								var win = Ext.widget('backupcfgedit');
								var form = win.down('form').getForm();
								var record = me.getList().getSelectionModel()
										.getSelection()[0];
								form.loadRecord(record);
								form.findField('f_backup_cfgname')
										.setReadOnly(true);
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

							recordIdArray[i] = records[i]
									.get('f_backup_cfgname');
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
												me.getBackupCfgsStore().load();

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
			'backupcfgedit button[action=save]' : {
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
										me.getBackupCfgsStore().load();
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
