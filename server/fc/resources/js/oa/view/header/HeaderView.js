
/*
 * Header View
 */

Ext.define('FC.view.header.HeaderView', {
			id : 'headerView',
			extend : 'Ext.panel.Panel',
			alias : 'widget.header',
			requires : ['FC.store.MenuStore'],

			initComponent : function() {
				var me = this;

				me.callParent(arguments);
			}

		});

// show view
function showView(viewname) {

	// console.log('click ' + viewname + ' '+new Date());
	if(viewname.length<1) return;
	var vv = Ext.widget(viewname.toLowerCase());

	// show_map.add(viewname,vv);
	var main = Ext.getCmp('main');
	main.removeAll();
	main.add(vv);
	//console.log(main);

}

// function add menu
function addMenu() {
	var header_html = '';
	var menu_store = Ext.create('FC.store.MenuStore');
	menu_store.load({
				// layout : 'fit',
				// style : 'overflow:visible',

				callback : function() {
					Ext.getDom('header-tpl').innerHTML = '';
					// create menu
				    //console.log('createMenu');
					menu = createMenu(this);
					// set menu
					// console.log('set menu');
					Ext.getDom('div_menu').innerHTML = menu;
					// render menu
					// console.log('render menu');
					new Ext.ux.Menu('header_menu', {
								transitionType : 'fade',
								direction : 'horizontal', // default
								delay : 0.2, // default
								autoWidth : true, // default
								transitionDuration : 0.3, // default
								animate : true, // default
								currentClass : 'current' // default
							});
					var first = Ext.widget('dbcfglist');
					//var first = Ext.widget('sourcefilelistview');
					Ext.getCmp('main').add(first);

				}
			});

}

// create menu from store
function createMenu(store) {

	var menu_html = '<ul id="header_menu">';
	var li_arr = new Array();
	var sub_arr = new Array();

	// items
	store.each(function(record) {
				if (record.get('parent') == '0' || record.get('parent') == '') {
					li_arr.push(record);
				}
			});

	// sub items
	for (var i = 0; i < li_arr.length; i++) {
		var subs = new Array();
		var item = li_arr[i];
		store.each(function(record) {
					if (record.get('parent') == item.get('id')) {
						subs.push(record);
					}
				});
		sub_arr[i] = subs;
	}

	// ....sub sub items

	// console.log(li_arr);
	// console.log(sub_arr[0]);

	// build dom
	for (var i = 0; i < li_arr.length; i++) {

		if (sub_arr[i].length > 0) {
			menu_html += Ext.String.format('<li><a href="#">{0}</a>', li_arr[i]
							.get('text'), li_arr[i].get('action'));
			menu_html += '<ul>';
			for (var j = 0; j < sub_arr[i].length; j++) {

				menu_html += Ext.String
						.format(
								'<li><a href="#" class="can_link" onclick="showView(\'{1}\')">{0}</a></li>',
								sub_arr[i][j].get('text'), sub_arr[i][j]
										.get('action'));
			}
			menu_html += '</ul>';
		} else {
			menu_html += Ext.String
					.format(
							'<li><a href="#" class="can_link" onclick="showView(\'{1}\')">{0}</a>',
							li_arr[i].get('text'), li_arr[i].get('action'));
		}
		menu_html += '</li>';
	}

	menu_html += '</ul>';
	// console.log(menu_html);
	return menu_html;
}
