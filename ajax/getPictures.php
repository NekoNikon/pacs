<?php 
    include_once "../config.php";
    $data = array();
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $picture = $server->getPicture($_GET['stu'] , $_GET['ser'], $_GET['ins']);
    echo $picture;