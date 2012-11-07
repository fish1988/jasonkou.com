<?php
defined('INDEX') or die('Not Allowed');

require_once(dirname(__FILE__).'/BaseController.php');
require_once(dirname(__FILE__).'/../vo/GridVo.php');
require_once(dirname(__FILE__).'/../vo/OperationResultVo.php');

class BackupCfgController extends BaseController {
                                  
    public function doList() {
        $start = $this->getStart();
        $limit = $this->getLimit();
        $sort = $this->getSort(DAO::$backupCfgFields);
        $dir = $this->getDir();
        
        $total = $this->dao->count('t_backup_cfg');
        $items = $this->dao->find('t_backup_cfg', null, $sort, $dir, $start, $limit);
        $gridVo = new GridVo(true, $total, $items);
        echo json_encode($gridVo);
    }
    
    public function doSave() {
        $vo = $this->copyToVo(DAO::$backupCfgFields);
        $this->dao->saveOrUpdate('t_backup_cfg', 'f_backup_cfgname', $vo);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }

    public function doDelete() {
        $ids = $this->getIds();
        $this->dao->delete('t_backup_cfg', 'f_backup_cfgname', $ids);
        $operationResultVo = new OperationResultVo(true, 'success');
        echo json_encode($operationResultVo);
    }
    
}