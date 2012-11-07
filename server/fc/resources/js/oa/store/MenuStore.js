/*
*  Menu store
*/
Ext.define('FC.store.MenuStore', {
    extend: 'Ext.data.Store',
    model: 'FC.model.Menu',  
	proxy: {
        type: 'ajax',
        
        url: 'resources/js/data/menu.json' , // data
        
        reader: {
            type: 'json',
            root: 'results',
			successProperty: 'success'
        } 

    }
});
