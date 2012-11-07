<?php
defined('INDEX') or die('Not Allowed');

class GridVo {
    public $success;
    public $total;
    public $items;
    
    public function __construct($success, $total, $items) {
       $this->success = $success;
       $this->total = $total;
       $this->items = $items;
    }
    
}