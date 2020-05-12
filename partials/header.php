<?php
$login = "admin";
$password = "!234";
if(isset($_SERVER['PHP_AUTH_USER']) && ($_SERVER['PHP_AUTH_PW']==$password) && (strtolower($_SERVER['PHP_AUTH_USER'])==$login)){
    // авторизован успешно
} else {
    // если ошибка при авторизации, выводим соответствующие заголовки и сообщение
    header('WWW-Authenticate: Basic realm="Backend"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Authenticate required!';
}
?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Antis:PACS</title>
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta name="description" content="Sufee Admin - HTML5 Admin Template">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="node_modules\babel-polyfill\dist\polyfill.min.js" type="text/javascript"></script>
    <link rel="apple-touch-icon" href="apple-icon.png">
    <link rel="shortcut icon" href="favicon.ico">

    <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">

    <link rel="stylesheet" href="vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="vendors/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap-datepicker.css">
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css"> -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="build/css/style.css">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>

</head>

<body>

    <!-- Left Panel -->

    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
            <div class="navbar-header">
                <a class="navbar-brand" href="./"><img src="src/icons/logo.png" alt="Logo"></a>
            </div>
            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="menu-title active">
                        <a href="#" ><i class="fa fa-file fa-2x"></i> <p>Исследования</p></a>
                    </li>
                    <li class="menu-title">
                        <a href="#" ><i class="fa fa-user fa-2x"></i><p>Пациенты</p></a>
                    </li>
                    <li class="menu-title"> 
                        <a href="#"><img src="src/icons/report.png" alt=""><p>Отчет</p></a>
                    </li>
                </ul>
            </div>
        </nav>
    </aside><!-- /#left-panel -->

    <!-- Left Panel -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <header id="header" class="row header">
            <div class="left col-7">
                <input id="dateOfStudy" type="text" placeholder="Дата исследования">
                <input type="radio" name="times" value="today" id="today" >
                <label for="today">Сегодня</label>
                <input type="radio" name="times" value="sevenday" id="sevenday">
                <label for="sevenday">7Д</label>
                <input type="radio" name="times" value="month" id="month">
                <label for="month">1М</label>
                <input type="radio" name="times" value="year" id="year">
                <label for="year">1Г</label>
                <input type="radio" name="times" value="any" id="any">
                <label for="any">Любая дата</label>
                <button ><i class="fa fa-search"></i></button>
            </div>
            <div class="col-5 right">
                <div class="float-right">
                <label class="container-checkbox">Все
                    <input type="checkbox" checked="checked">
                    <span class="checkmark"></span>
                </label>
                <label class="container-checkbox">CR
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <label class="container-checkbox">CT
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <label class="container-checkbox">DX
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <!-- <div class="dropdown all-modality"> -->
                <label class="all-modality">
                    <div class="dropdown">
                        <button class="dropbtn fa fa-ellipsis-v"></button>
                        <div id="droplist" class="dropdown-content">
                            <div class="col-6">
                                <label for="">Modality</label>
                            </div>
                            <div class="col-6">
                                <label class="float-right dropup" onclick="close()" for=""><i class="fa fa-chevron-up" aria-hidden="true"></i></label><br>
                            </div>
                            <div class="col-6">
                                <label class="container-checkbox">CR
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">CT
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>    
                                <label class="container-checkbox">DX
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">ET
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="col-6">
                                <label class="container-checkbox">NI
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">KO
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>    
                                <label class="container-checkbox">NN
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">EE
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            
                            
                        </div>
                    </div> 
                </label>
                <!-- </div> -->
                
                </div>
            </div>
            
        </header><!-- /header -->
        <!-- Header-->
        
        <div class="content mt-3">
<?php
    if(!isset($_SESSION['user'])) {
        header('login.php');
    }
?>