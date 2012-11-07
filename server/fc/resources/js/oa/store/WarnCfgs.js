/**
 * @class FC.store.WarnCfgs
 * @require FC.model.WarnCfg
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.store.WarnCfgs', {
			extend : 'Ext.data.Store',
			model : 'FC.model.WarnCfg',
			remoteSort : true,
			autoLoad : false,
			pageSize : 10,
			proxy : {
				type : 'ajax',
				url : '',
				sortParam : 'sort',
				directionParam : 'dir',
				simpleSortMode : true,
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total',
					successProperty : 'success'
				}
			},
			sorters : [{
						property : 'f_warncfg_name',
						direction : 'ASC'
					}]
		});