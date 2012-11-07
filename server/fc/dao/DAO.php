<?php
defined('INDEX') or die('Not Allowed');

require_once(dirname(__FILE__).'/../config.php');

class DAO {

    private $pdo = null;
    private static $instance = null;
    
    public static $dbCfgFields = array('f_conn_name', 'f_ip', 'f_port', 'f_db_name', 'f_db_type', 'f_user', 
                                       'f_password', 'f_charset', 'f_create_time', 'f_create_user', 
                                       'f_modify_time', 'f_modify_user', 'f_status'
                                      );
    
    public static $backupCfgFields = array('f_backup_cfgname', 'f_script_name', 'f_dst_filepath', 'f_dst_ip', 'f_local_path', 
                                           'f_sync_type', 'f_zip_type', 'f_save_cycle', 'f_create_time', 'f_create_user', 
                                           'f_modify_time', 'f_modify_user', 'f_status'
                                          );   
                                          
    public static $syncCfgFields = array('f_sync_cfgname', 'f_script_name', 'f_src_filepath', 'f_src_ip', 'f_local_path', 'f_push_pul',
                                         'f_sync_type', 'f_zip_type', 'f_save_cycle', 'f_create_time', 'f_create_user', 
                                         'f_modify_time', 'f_modify_user', 'f_status'
                                         );

    public static $warnCfgFields = array('f_warncfg_name', 'f_serv_type', 'f_warn_type', 'f_receiver', 'f_mail', 'f_rtx',
                                         'f_sms', 'f_delay_strategy', 'f_create_time', 'f_create_user', 
                                         'f_modify_time', 'f_modify_user', 'f_status'
                                         );  

    public static function getInstance() {
        if (self::$instance == null) {
            global $db_host, $db_name, $db_user, $db_password;
            self::$instance = new DAO($db_host, $db_name, $db_user, $db_password);
        }
        return self::$instance;
    }
    
    private function __construct($host, $database, $user, $password) {
        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$database", $user, $password);
        } catch (PDOException $e) {
            echo 'Connect Database Exception:' . $e->getMessage();
        }
    }
    
    public function findOne($sql, $params = null) {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function findAll($sql, $params = null) {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findSingle($sql, $params = null) {
         $statement = $this->pdo->prepare($sql);
         $statement->execute($params);
         return $statement->fetchColumn(0);
    }

    public function execute($sql, $params = null) {
        $statement = $this->pdo->prepare($sql);
        return $statement->execute($params);
    }
    
    public function count($table, $conditions = null) {
        $sql = "SELECT COUNT(*) FROM $table ";
        $where = array();
        $values = array();
        if ($conditions !== null) {
            foreach ($conditions as $key => $value) {
                $where[] = "$key = ?";
                $value[] = $value;
            }
            $sql .= implode(' ADN ', $where);;
        }

        return $this->findSingle($sql, $values);
    }
    
    public function find($table, $conditions = null, $sort = null, $dir = null, $offset = null, $limit = null) {
        $sql = "SELECT * FROM $table ";
        $where = array();
        $values = array();
        if ($conditions !== null) {
            foreach ($conditions as $key => $value) {
                $where[] = "$key = ?";
                $value[] = $value;
            }
            $sql .= implode(' ADN ', $where);;
        }
        if ($sort !== null && $dir !== null) {
            $sql .= " ORDER BY $sort $dir";
        }
        if ($offset !== null && $limit !== null) {
            $sql .= " LIMIT $offset, $limit";
        }

        return $this->findAll($sql, $values);
    }
   
    public  function checkDuplicated($table, $primaryKey, $primaryKeyValue) {
        $sql = "SELECT COUNT(*) FROM $table WHERE $primaryKey = ?";
        $count = $this->findSingle($sql, array($primaryKeyValue));
        return ($count == 0) ? false : true;
    }
    
    public function saveOrUpdate($table, $primaryKey, $vo) {
        if (!isset($vo[$primaryKey])) {
            return;
        }
        
        $isDuplicated = $this->checkDuplicated($table, $primaryKey, $vo[$primaryKey]);
        if ($isDuplicated) {
            $this->update($table, $primaryKey, $vo);
        } else {
            $this->save($table, $vo);
        }
    }
    
    public function save($table, $vo) {
        $keys = array();
        $placeHolders = array();
        $values = array();
        // NOTE: Add 'f_create_time', 'f_create_user', 'f_modify_time', 'f_modify_user'
        $now = date('Y-m-d H:i:s');
        $vo['f_create_time'] = $now;
        $vo['f_create_user'] = @$_SESSION['LOGIN_NAME'];
        $vo['f_modify_time'] = $now;
        $vo['f_modify_user'] = @$_SESSION['LOGIN_NAME'];
        foreach ($vo as $key => $value) {
            $keys[] = $key;
            $placeHolders[] = ":$key";
            $values[":$key"] = $value;
        }
        
        $fields = implode(',', $keys);
        $params = implode(',', $placeHolders);
        $sql = "INSERT INTO $table ($fields) VALUES ($params)";
        $this->execute($sql, $values);
    }
    
    public function update($table, $primaryKey, $vo) {
        $sets = array();
        $values = array();
        // NOTE: Add 'f_modify_time', 'f_modify_user'
        $vo['f_modify_time'] = date('Y-m-d H:i:s');
        $vo['f_modify_user'] = @$_SESSION['LOGIN_NAME'];
        foreach ($vo as $key => $value) {
            if ($key != $primaryKey) {
                $sets[] = "$key = :$key";
            }
            $values[":$key"] = $value;
        }
        
        $fields = implode(', ', $sets);
        $sql = "UPDATE $table SET $fields WHERE $primaryKey = :$primaryKey";
        $this->execute($sql, $values);
    }
    
    public function delete($table, $primaryKey, $ids) {
        $idList = array();
        foreach ($ids as $id) {
            $idList[] = $this->quote($id);
        }
        $ids = implode(', ', $idList);
        $sql = "DELETE FROM $table WHERE $primaryKey IN ($ids)";
        $this->execute($sql);
    }
    
    public function quote($var) {
        return $this->pdo->quote($var);
    }

    public function beginTransaction() {
        $this->pdo->beginTransaction();
    }

    public function commit() {
        $this->pdo->commit();
    }

    public function rollBack() {
        $this->pdo->rollBack();
    }
  
}