/**
 * @class FC.store.SyncCfgs
 * @require FC.model.SyncCfg
 * @version 1.0
 * @date 2011/11/9 
 * @author jasonkou
 */
Ext.define('FC.store.SyncCfgs', {
			extend : 'Ext.data.Store',
			model : 'FC.model.SyncCfg',
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
						property : 'f_sync_cfgname',
						direction : 'ASC'
					}]
		});