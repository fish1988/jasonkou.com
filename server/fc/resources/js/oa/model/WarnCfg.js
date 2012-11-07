/**
 * @class FC.model.WarnCfg
 * @from WarnCfgVO
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.model.WarnCfg', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'f_warncfg_name',
						type : 'string'
					}, {
						name : 'f_serv_type',
						type : 'string'
					}, {
						name : 'f_warn_type',
						type : 'string'
					}, {
						name : 'f_receiver',
						type : 'string'
					}, {
						name : 'f_mail',
						type : 'int'
					}, {
						name : 'f_rtx',
						type : 'int'
					}, {
						name : 'f_sms',
						type : 'int'
					}, {
						name : 'f_delay_strategy',
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