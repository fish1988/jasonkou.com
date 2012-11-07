/**
 * @class FC.model.DbCfg
 * @from DbCfgVO
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.model.DbCfg', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'f_conn_name',
						type : 'string'
					}, {
						name : 'f_ip',
						type : 'string'
					}, {
						name : 'f_port',
						type : 'int'
					}, {
						name : 'f_db_name',
						type : 'string'
					}, {
						name : 'f_db_type',
						type : 'int'
					}, {
						name : 'f_user',
						type : 'string'
					}, {
						name : 'f_password',
						type : 'string'
					}, {
						name : 'f_charset',
						type : 'string'
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