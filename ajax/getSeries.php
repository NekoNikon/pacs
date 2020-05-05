<?php
    include_once "../config.php";
    $data = array();
    
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;

    $series = $server->getSeries($_POST['id']);
    $row = (object)array("sop"=>"", "cmean"=>"", "mod"=>"","inst"=>"");
    foreach($series as $el) {
        $row -> sop = $el->{'00080062'}->Value[0];
        $row -> cmean = $el->{'00180015'}->Value[0];
        $row -> mod = $el->{'00080060'}->Value[0]; 
        $row -> ser = $el->{'0020000E'}->Value[0];
        $row -> study = $el->{'0020000D'}->Value[0];
        array_push($data,$row);
    }

    echo json_encode($data);
    