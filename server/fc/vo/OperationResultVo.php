<?php
defined('INDEX') or die('Not Allowed');

class OperationResultVo {
    public $success;
    public $message;
    
    public function __construct($success, $message) {
       $this->success = $success;
       $this->message = $message;
    }
    
}