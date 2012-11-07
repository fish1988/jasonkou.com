/**
 * @class FC.model.User
 * @from UserVO
 * @version 1.0
 * @date 2011/11/9
 * @author jasonkou
 */
Ext.define('FC.model.User', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'f_user_name',
						type : 'string'
					},{
						name : 'f_user_type',
						type : 'int'
					},{
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