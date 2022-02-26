<?php
    ob_start();
    session_start();
    require_once "classes/dcm4cheeAPI.php";
    $config = array(
        "host"=>"",
        "port"=>"",
        "auth"=>"",
        "secret"=>''
    );
    $server = new DCM4CHEEAPI($config);
