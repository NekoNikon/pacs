<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="build/css/style.css">
</head>
<body>
<?php
    ob_start();
    session_start();
    if(!isset($_SESSION['user'])) {
        header('login.php');
    }
?>