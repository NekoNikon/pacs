<?php
    include_once "../config.php";
    $_POST = json_decode(file_get_contents('php://input'), true);
    $data = array();
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;

    $res=$server->getStudiesCount( $server->getQueryFromFilter($_POST));

    echo json_encode($res);
