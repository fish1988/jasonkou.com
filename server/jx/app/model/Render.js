var Render = 
{
    "tableName":"t_render",
    "primaryKey":"renderId",
    "renderId":{
        "type":"INT(11)",
        "desc":"函数ID",
        "column":"f_render_id"
    },
    "renderName":{
        "type":"VARCHAR(200)",
        "desc":"函数名",
        "column":"f_render_name"
    },
    "paramCount":{
        "type":"INT(11)",
        "desc":"参数个数",
        "column":"f_param_count"
    },
    "renderType":{
        "type":"VARCHAR(200)",
        "column":"f_render_type"
    },
    "content":{
        "type":"VARCHAR(2000)",
        "desc":"函数主体",
        "column":"f_content"
    },
    "desc":{
        "type":"VARCHAR(2000)",
        "desc":"描述",
        "column":"f_desc"
    },
    "createTime":{
        "type":"DATETIME",
        "column":"f_create_time"
    },
    "createUser":{
        "type":"VARCHAR(200)",
        "column":"f_create_user"
    },
    "modifyTime":{
        "type":"DATETIME",
        "column":"f_modify_time"
    },
    "modifyUser":{
        "type":"VARCHAR(200)",
        "column":"f_modify_user"
    },
    "status":{
        "type":"TINYINT(11)",
        "column":"f_status"
    }
} 
module.exports=Render