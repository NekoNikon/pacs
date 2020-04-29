<?php
    include_once "../config.php";
    
    $res = $server->getPatients($_GET['sid']);
    echo json_encode($res);
    