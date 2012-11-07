/**
 * Header
 */

Ext.define('FC.controller.HeaderCtrl', {
			extend : 'Ext.app.Controller',
			models : ['Menu'],
			stores : ['MenuStore'],// stores
			views : ['header.HeaderView'],// views
			refs : [{ // 
				ref : 'header',
				selector : 'header'
			}],
			init : function() {

				var me = this;
				me.control({

				});

			}

		});
