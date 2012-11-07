<?php
define('INDEX', true);

require_once(dirname(__FILE__).'/controller/DbCfgController.php');
require_once(dirname(__FILE__).'/controller/SyncCfgController.php');
require_once(dirname(__FILE__).'/controller/BackupCfgController.php');
require_once(dirname(__FILE__).'/controller/WarnCfgController.php');
require_once(dirname(__FILE__).'/utils/utils.php');

// Check login session
checkLogin();

if (isset($_GET['ctrl'])) {

    switch ($_GET['ctrl']) {
        case 'db':
            $controller = new DbCfgController();
            break;       
        case 'sync':
            $controller = new SyncCfgController();
            break;        
        case 'backup':
            $controller = new BackupCfgController();
            break;
        case 'warn':
            $controller = new WarnCfgController();
            break;  
         default:
            exit('Not Allowed');
    }
    
    $controller->execute();
}