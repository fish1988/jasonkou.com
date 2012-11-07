
CREATE TABLE `t_render` (
  `f_render_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '函数ID',
  `f_render_name` VARCHAR(200) NOT NULL COMMENT '函数名',
  `f_param_count` INT(11) NOT NULL COMMENT '参数个数',
  `f_render_type` VARCHAR(200) NOT NULL COMMENT '类型:data-render|cls-render',
  `f_content` VARCHAR(2000) NOT NULL COMMENT '函数主体',
  `f_desc` VARCHAR(2000) DEFAULT NULL COMMENT '描述',
  `f_create_time` DATETIME DEFAULT NULL,
  `f_create_user` VARCHAR(200) DEFAULT NULL,
  `f_modify_time` DATETIME DEFAULT NULL,
  `f_modify_user` VARCHAR(200) DEFAULT NULL,
  `f_status` TINYINT(11) DEFAULT NULL,
  PRIMARY KEY (`f_render_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;