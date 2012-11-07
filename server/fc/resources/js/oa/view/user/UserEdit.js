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
                                blankText : '������Ϊ��',
                                labelAlign : 'right',
                                msgTarget : 'side'
                            },
                            items : [{name :'f_create_user', fieldLabel:'������',emptyText : '������...'},{name :'f_modify_time', fieldLabel:'�޸�ʱ��',emptyText : '������...'},{name :'f_modify_user', fieldLabel:'�޸���',emptyText : '������...'},{name :'f_status', fieldLabel:'״̬',emptyText : '������...'}]
                        });

                me.callParent(arguments);
            }
        });

Ext.define('FC.view.user.UserEdit', {
            extend : 'Ext.window.Window',
            alias : 'widget.useredit',
            title : '�û�����',
            autoShow : false,
            //height : auto,
            width : 350,
            layout : 'fit',

            initComponent : function() {
                var me = this;
                me.items = Ext.widget('usereditform');
                me.buttons = [{
                            text : '����',
                            icon : 'resources/images/icons/save.png',
                            action : 'save'
                        }, {
                            text : '����',
                            icon : 'resources/images/icons/reset.png',
                            handler : function() {
                                me.down('form').getForm().reset();
                            }

                        }, {
                            text : 'ȡ��',
                            icon : 'resources/images/icons/cancel.png',
                            handler : function() {
                                me.close();
                            }
                        }];
                me.callParent(arguments);
            }
        });