<?php
    ob_start();
    session_start();
    if (!isset($_SESSION['admin'])) {
        header('location: /login.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Cache-Control" content="no-cache" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>antis:PACS - dashboard</title>
        <link href="/admin-assets/styles.css" rel="stylesheet" />
        <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
        <link rel="stylesheet" href="/admin-assets/chosen/chosen.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/admin/index.php">antis:PACS - dashboard</a><button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class=""></i></button
            ><!-- Navbar Search-->
            <form class=" d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <a href="/logout.php"><i class="fas fa-sign-out-alt"></i> Выйти</a>
            </form>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                            <div class="nav">
                            <div class="sb-sidenav-menu-heading">Меню</div>
                            <a class="nav-link" href="index.php"><div class="sb-nav-link-icon"><i class="fas fa-users"></i></div><span>Пользователи</span></a>
                            <a class="nav-link" href="organization.php"><div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div><span>Организации</span></a>
                            <a class="nav-link" href="device.php"><div class="sb-nav-link-icon"><i class="fas fa-device"></i></div><span>Устройства</span></a>
                            <a class="nav-link" href="/"><div class="sb-nav-link-icon"><i class="fas fa-x-ray"></i></div><span>PACS</span></a>
                        </div>
                    </div>
                     
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">