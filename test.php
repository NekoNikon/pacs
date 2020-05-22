<?php 
    include_once "config.php";
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $res = $server->test("StudyDate=");

    echo "<pre>";
    print_r(count($res));
    echo "</pre>"; 