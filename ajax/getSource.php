<?php
    include_once "../config.php";
    
    $res = $server->getSource($_POST['suid']);
    echo json_encode($res);
    