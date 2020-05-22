<?php
    

    include_once "../config.php";
    $_POST = json_decode(file_get_contents('php://input'), true);
    $data = array();
    $token = $server->setToken();
    $_SESSION['token'] = $token->access_token;
    // $patients = $server->getPatients($_POST['limit']);
    // foreach($patients as $el) {
        $study = $server->getStudies( $server->getQueryFromFilter($_POST));
        foreach($study as $sub) {
            $source = $server->getSource($sub->{'0020000D'}->Value[0]);
            $row = (object)array("iin"=>"","fio"=>"","suid"=>"","sex"=>"","btd"=>"","sdate"=>"","stime"=>"","des"=>"","src"=>"");
            foreach($source as $src) {
                $row-> iin = $sub->{'00100020'}->Value[0];
                $row-> fio = $sub->{'00100010'}->Value[0]->Alphabetic;
                $row-> suid = $sub->{'0020000D'}->Value[0];
                $row-> sex = $sub->{'00100040'}->Value[0];
                $row-> btd = $server->prettyDate($sub->{'00100030'}->Value[0], '-');
                $row-> sdate = $server->prettyDate($sub->{'00080020'}->Value[0], '-');
                $row-> stime=  $server->prettyTime($sub->{'00080030'}->Value[0], ':');
                $row-> des = $sub->{'00081030'}->Value[0];
                $row-> src = $src->{'00080080'}->Value[0];
                array_push($data,$row);
            }   
        }
    // }
    echo json_encode($data);
    