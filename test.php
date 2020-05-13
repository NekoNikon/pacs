<?php 
    include_once "config.php";
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $res = $server->getSeries("1.3.51.0.7.533588382.36611.65095.44244.37707.8783.1252");

    echo "<pre>";
    foreach($res as $el) {
        print_r($el->{'0020000E'}->Value[0]."\n");
    }
    // print_r($res);
    echo "</pre>"; 