var Jx = 'data.php?ctrl=';
var listUrl = 'list.html';

Ext.Loader.setConfig({
			enabled : true

		});// load

Ext.application({
			// namespace
			name : 'FC',
			appFolder : 'resources/js/oa',

			// all controllers used in app
			controllers : [

					'HeaderCtrl','UserCtrl',

					'DbCfgCtrl', 'WarnCfgCtrl','SyncCfgCtrl','BackupCfgCtrl'],

			autoCreateViewport : true
		});
