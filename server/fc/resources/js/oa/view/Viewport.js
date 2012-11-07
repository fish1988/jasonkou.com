/*
 * 
 * This file is part of Ext JS 4
 * 
 * Copyright (c) 2011 Sencha Inc
 * 
 * Contact: http://www.sencha.com/contact
 * 
 * GNU General Public License Usage This file may be used under the terms of the
 * GNU General Public License version 3.0 as published by the Free Software
 * Foundation and appearing in the file LICENSE included in the packaging of
 * this file. Please review the following information to ensure the GNU General
 * Public License version 3.0 requirements will be met:
 * http://www.gnu.org/copyleft/gpl.html.
 * 
 * If you are unsure which license is appropriate for your use, please contact
 * the sales department at http://www.sencha.com/contact.
 * 
 */
/**
 * The main application viewport, which displays the whole application
 * 
 * @extends Ext.Viewport
 */
Ext.define('FC.view.Viewport', {
			extend : 'Ext.Viewport',

			initComponent : function() {
				var me = this;

				Ext.apply(me, {
							layout : 'border',
							style : 'background-color:white',
							frame : false,
							items : [

							{
										id : 'header',
										region : 'north',
										height : 125,
										border : false,
										html : Ext.getDom('header-tpl').innerHTML
									}, {
										id : 'main',
										layout : 'fit',
										region : 'center',
										border : false,

										items : []

									}]

						});
				addMenu();//

				me.callParent(arguments);
			}
		});

