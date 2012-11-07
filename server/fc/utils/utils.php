<?php
defined('INDEX') or die('Not Allowed');

require_once(dirname(__FILE__).'/../config.php');

function checkLogin() {
    // Check login session
    session_start();
    if (!isset($_SESSION['LOGIN_NAME'])) {
        if (isset($_GET['from']) && $_GET['from'] == 'extjs') {
            exit('session_timeout');
        }
        global $base_url;
        $url .= $base_url.'sso.php?cmd=login';
        header('location: http://passport.oa.com/modules/passport/signin.ashx?url=' . urlencode($url));
        exit();
    }
}
