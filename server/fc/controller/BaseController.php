<?php
defined('INDEX') or die('Not Allowed');

require_once(dirname(__FILE__).'/../dao/DAO.php');

abstract class BaseController {

    protected $dao;
    
    public function __construct() {
       $this->dao = DAO::getInstance();
    }
    
    public function execute() {
        if (isset($_REQUEST['cmd'])) {
            $task = 'do' . ucfirst($_REQUEST['cmd']);
            $this->$task();
        }
    }
    
    public function get($key, $default = null) {
        if (isset($_REQUEST[$key])) {
            return $_REQUEST[$key];
        }
        return $default;
    }

    public function getStart() {
        $start = 0;
        if (isset($_REQUEST['start'])) {
            $start = (int) $_REQUEST['start'];
        }
        return $start;
    }
    
    public function getLimit() {
        $limit = 10;
        if (isset($_REQUEST['limit'])) {
            $limit = (int) $_REQUEST['limit'];
        }
        return $limit;
    }
    
    public function getSort($allowed = array()) {
        $sort = null;
        if (isset($_REQUEST['sort']) && in_array($_REQUEST['sort'], $allowed)) {
            $sort = $_REQUEST['sort'];
        }
        return $sort;
    }
    
    public function getDir() {
        $dir = null;
        if (isset($_REQUEST['dir']) && in_array(strtolower($_REQUEST['dir']), array('asc', 'desc'))) {
            $dir = $_REQUEST['dir'];
        }
        return $dir;
    }
    
    public function getIds() {
        $idList = array();
        if (isset($_REQUEST['ids'])) {
            $ids = $_REQUEST['ids'];
            $idArray = explode(',', $ids);
            foreach ($idArray as $id) {
                if (!empty($id)) {
                    $idList[] = $id;
                }
            }
        }
        return $idList;
    }
    
    public function copyToVo($fields = array()) {
        $vo = array();
        foreach ($fields as $field) {
            if (isset($_REQUEST[$field])) {
                $vo[$field] = $_REQUEST[$field];
            }
        }
        return $vo;
    }
    
}