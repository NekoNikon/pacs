<?php
session_start();
    header("charset=utf-8");
    $study = $_POST['st'];
    $ser   = $_POST['ser'];
    $obj   = null;

    include_once "../config.php";

    $b64 = $server->download($study,$ser);
    $b64 = str_replace("\r\n" , " " , $b64);
    echo $b64;