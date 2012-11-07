<?php
define('INDEX', true);

require_once(dirname(__FILE__).'/utils/utils.php');

// Check login session
checkLogin();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>后台配置系统</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="resources/extjs/resources/css/ext-all.css" type="text/css" />
    <link rel="stylesheet" href="resources/css/custom.css" type="text/css" />
    <link rel="stylesheet" href="resources/css/menu_blue.css" type="text/css" />
    <script type="text/javascript" src="resources/extjs/ext-all.js"></script>
    <script type="text/javascript" src="resources/extjs/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="resources/js/common/session.js"></script>
    <script type="text/javascript" src="resources/js/common/message.js"></script>
    <script type="text/javascript" src="resources/js/common/menu.js"></script>
    <script type="text/javascript" src="resources/js/common/page.js"></script>
    <script type="text/javascript" src="resources/js/oa.js"></script>
    <script type="text/javascript" src="resources/js/common/utils.js"></script>
  </head>
  <body>
    <!-- header tpl-->
    <div id="header-tpl" style="display: none">
      <div>
        <div style="position: absolute; right: 5px; margin-top: 8;">
        <span style="font-size: 14px">您好,<?php echo $_SESSION['LOGIN_NAME']?></span> 
        <span>|</span> 
        <a href="sso.php?cmd=logout">注销</a></div>
        <div id="div_menu" style="position: absolute; left: 280px; top: 66px;"></div>
      </div>
      <div>
        <div>
          <a class="logo" href="/index.html"></a>
        </div>
      </div>
    </div>
  </body>
</html>
