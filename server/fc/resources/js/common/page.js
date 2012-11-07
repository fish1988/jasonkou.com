Ext.ns('Ext.ux.plugins');

Ext.ux.plugins.PageComboResizer = Ext.extend(Object, {

	pageSizes : [5, 10, 15, 20, 25, 30, 50, 100],
	prefixText : '每页显示 ',
	postfixText : '条',

	constructor : function(config) {
		Ext.apply(this, config);
		Ext.ux.plugins.PageComboResizer.superclass.constructor.call(this,
				config);
	},

	init : function(pagingToolbar) {
		var ps = this.pageSizes;
		var combo = new Ext.form.ComboBox({
					name : 'pagecombo',
					typeAhead : true,
					triggerAction : 'all',
					lazyRender : false,
					mode : 'local',
					width : 45,
					store : ps,
					editable : true,
					listeners : {
						select : function(p) {
							pagingToolbar.store.pageSize = p.value;// pagesize
							var rowIndex = 0;
							var gp = pagingToolbar.findParentBy(function(ct,
											cmp) {
										return (ct instanceof Ext.grid.GridPanel)
												? true
												: false;
									});
							var sm = gp.getSelectionModel();

							rowIndex += (pagingToolbar.store.currentPage - 1)
									* pagingToolbar.store.pageSize;

							pagingToolbar.store.loadPage(1);

						}
					}
				});

		Ext.iterate(this.pageSizes, function(ps) {
					if (ps == pagingToolbar.store.pageSize) {
						combo.setValue(ps);
						return;
					}
				});

		var inputIndex = pagingToolbar.items.indexOf(pagingToolbar.refresh);
		pagingToolbar.insert(++inputIndex, '-');
		pagingToolbar.insert(++inputIndex, this.prefixText);
		pagingToolbar.insert(++inputIndex, combo);
		pagingToolbar.insert(++inputIndex, this.postfixText);
		pagingToolbar.on({
					beforedestroy : function() {
						combo.destroy();
					}
				});

	}
});