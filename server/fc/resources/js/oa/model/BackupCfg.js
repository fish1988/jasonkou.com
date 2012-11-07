/**
 * @class FC.model.BackupCfg
 * @from BackupCfgVO
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.model.BackupCfg', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'f_backup_cfgname',
						type : 'string'
					}, {
						name : 'f_script_name',
						type : 'string'
					}, {
						name : 'f_dst_filepath',
						type : 'string'
					}, {
						name : 'f_dst_ip',
						type : 'string'
					}, {
						name : 'f_local_path',
						type : 'string'
					}, {
						name : 'f_sync_type',
						type : 'int'
					}, {
						name : 'f_zip_type',
						type : 'int'
					}, {
						name : 'f_save_cycle',
						type : 'int'
					}, {
						name : 'f_create_time',
						type : 'string'
					}, {
						name : 'f_create_user',
						type : 'string'
					}, {
						name : 'f_modify_time',
						type : 'string'
					}, {
						name : 'f_modify_user',
						type : 'string'
					}, {
						name : 'f_status',
						type : 'int'
					}]
		});