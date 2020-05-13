<?php 
    include_once "../config.php";
    $data = array();
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    $picture = $server->getPicture($_POST['stu'] , $_POST['ser'], $_POST['ins']);
    echo json_encode($picture);