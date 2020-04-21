<?php
    require_once "classes/dcm4cheeAPI.php";
    $config = array(
        "host"=>"http://89.218.233.58",
        "port"=>"8080",
        "auth"=>"https://89.218.233.58:8843/auth/realms/dcm4che/protocol/openid-connect/token/",
        "secret"=>'5df47d2e-c976-49a5-bfcf-b50615691fc4'
    );
    $server = new DCM4CHEEAPI($config);
