<?php 
    include_once "config.php";
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $res = $server->getPicture("1.3.51.0.7.14133812943.41457.63301.43474.37764.30822.30823" , "1.3.51.0.7.1868194691.47797.12100.36151.49382.1760.361","1.3.51.0.7.1117463284.45827.21825.35814.51090.6856.19639");

    echo "<pre>";
    print_r($res);
    echo "</pre>"; 