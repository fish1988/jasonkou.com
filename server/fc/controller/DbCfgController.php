<?php
defined('INDEX') or die('Not Allowed');

require(dirname(__FILE__).'/BaseController.php');
require(dirname(__FILE__).'/../vo/GridVo.php');
require(dirname(__FILE__).'/../vo/OperationResultVo.php');

class DbCfgController extends BaseController {
                                  
    public function doList() {
        $start = $this->getStart();
        $limit = $this->getLimit();
        $sort = $this->getSort(DAO::$dbCfgFields);
        $dir = $this->getDir();
        
        $total = $this->dao->count('t_db_cfg');
        $items = $this->dao->find('t_db_cfg', null, $sort, $dir, $start, $limit);
        $gridVo = new GridVo(true, $total, $items);
        echo json_encode($gridVo);
    }
    
    public function doSave() {
        $vo = $this->copyToVo(DAO::$dbCfgFields);
        $this->dao->saveOrUpdate('t_db_cfg', 'f_conn_name', $vo);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }

    public function doDelete() {
        $ids = $this->getIds();
        $this->dao->delete('t_db_cfg', 'f_conn_name', $ids);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }
    
}