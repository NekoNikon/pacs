<?php 
    include_once "config.php";
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $res = $server->getSeriesInfo("1.3.51.0.7.13265288417.49424.13127.36006.41166.13759.2507" , "1.3.51.0.7.4130356673.10432.42824.44359.44538.30809.50227", "1.3.51.0.7.32355549.6498.42817.34038.2256.22680.30325");

    echo "<pre>";
    print_r($res);
    echo "</pre>"; 