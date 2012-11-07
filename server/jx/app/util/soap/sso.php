<?php
define('INDEX', true);

require_once(dirname(__FILE__).'/config.php');

function login() {
    if (isset($_GET['ticket'])) {
        session_start();
        $soap = new SoapClient('http://10.6.12.14/services/passportservice.asmx?WSDL');  
        $result = $soap->DecryptTicket(array('encryptedTicket' => $_GET['ticket']));  
        if ($result->DecryptTicketResult->LoginName) { 
            $_SESSION['LOGIN_NAME'] = $result->DecryptTicketResult->LoginName;
            global $base_url;
            $url .= $base_url . 'index.php';
            header("location: $url");
            exit();
        } 
    }
}

function logout() {
    session_start();
    session_destroy();
    global $base_url;
    $url .= $base_url . 'sso.php?cmd=login';
    header('location: http://passport.oa.com/modules/passport/signout.ashx?url=' . urlencode($url));
    exit();
}

isset($_GET['cmd']) or die('Missing cmd parameter');
switch ($_GET['cmd']) {
    case 'login':
        login();
        break;       
    case 'logout':
        logout();
        break;
}
