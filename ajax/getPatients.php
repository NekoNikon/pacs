<?php
    include_once "../config.php";
    
    $res = $server->getStudies();
    echo json_encode($res);
    