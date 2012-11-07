/**
 * @class FC.controller.UserCtrl 
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.controller.UserCtrl', {
	extend : 'Ext.app.Controller',
	stores : ['Users'],
	models : ['User'],
	views : ['user.UserList'],
	refs : [{
				ref : 'list',
				selector : 'userlist'
			}],

	init : function() {
		var me = this;
		me.url = Jx + 'backup';
		me.control({
			'userlist' : {
				afterrender : function(gp) {
					// init
					// var listUrl = me.url + '&cmd=list';
					var listUrl = 'resources/js/data/user.json';
					// init
					loadMaskShow();
					me.getUsersStore().proxy.url = listUrl;

					me.getUsersStore().load({
								callback : function() {
									loadMaskHide();
								}
							});

					gp.on('edit', function(e) {

								Ext.Ajax.request({
											
											url : '',
											params:e.record.data,
											method : 'POST',
											success : function(response) {
												var obj = Ext
														.decode(response.responseText);
												if (obj.success == true) {
													Ext.Msg.alert("提示", "操作成功");
													me.getList().load();

												} else
													Ext.Msg.alert('提示', '操作失败');
											}
										});
								// console.log('edit');
								//console.log(e.record.data);
								e.record.commit();

							});

					// f5
					// query
					// add
					// edit
					// excel
				}
			}
		});

	}
});
