<?php 
    include_once "config.php";
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $res = $server->getStudies();

    echo "<pre>";
    print_r($res[0]);
    echo "</pre>"; 