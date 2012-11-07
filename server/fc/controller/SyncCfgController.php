<?php
defined('INDEX') or die('Not Allowed');

require_once(dirname(__FILE__).'/BaseController.php');
require_once(dirname(__FILE__).'/../vo/GridVo.php');
require_once(dirname(__FILE__).'/../vo/OperationResultVo.php');

class SyncCfgController extends BaseController {
                                  
    public function doList() {
        $start = $this->getStart();
        $limit = $this->getLimit();
        $sort = $this->getSort(DAO::$syncCfgFields);
        $dir = $this->getDir();
        
        $total = $this->dao->count('t_sync_cfg');
        $items = $this->dao->find('t_sync_cfg', null, $sort, $dir, $start, $limit);
        $gridVo = new GridVo(true, $total, $items);
        echo json_encode($gridVo);
    }
    
    public function doSave() {
        $vo = $this->copyToVo(DAO::$syncCfgFields);
        $this->dao->saveOrUpdate('t_sync_cfg', 'f_sync_cfgname', $vo);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }

    public function doDelete() {
        $ids = $this->getIds();
        $this->dao->delete('t_sync_cfg', 'f_sync_cfgname', $ids);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }
    
}