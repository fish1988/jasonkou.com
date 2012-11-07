/**
 * @view FC.view.user.UserEdit
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.view.user.UserEditForm', {
            extend : 'Ext.form.Panel',
            alias : 'widget.usereditform',
            initComponent : function() {
                var me = this;
                Ext.apply(me, {
                            frame : true,
                            bodyStyle : 'padding:5 10 5 5',
                            
                            defaultType : 'textfield',
                            defaults : {
                                blankText : '不允许为空',
                                labelAlign : 'right',
                                msgTarget : 'side'
                            },
                            items : [{name :'f_create_user', fieldLabel:'创建人',emptyText : '请输入...'},{name :'f_modify_time', fieldLabel:'修改时间',emptyText : '请输入...'},{name :'f_modify_user', fieldLabel:'修改人',emptyText : '请输入...'},{name :'f_status', fieldLabel:'状态',emptyText : '请输入...'}]
                        });

                me.callParent(arguments);
            }
        });

Ext.define('FC.view.user.UserEdit', {
            extend : 'Ext.window.Window',
            alias : 'widget.useredit',
            title : '用户管理',
            autoShow : false,
            //height : auto,
            width : 350,
            layout : 'fit',

            initComponent : function() {
                var me = this;
                me.items = Ext.widget('usereditform');
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