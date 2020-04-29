<?php
    include_once "config.php";
    require_once "partials/header.php";
    // $res = $server->getPatients();
    // echo "<pre>";
    // print_r($res[0]);
    // echo "</pre>";
?>
    <div class="main-container">
        <div class="sideleft">
        
        </div>

        <div class="main">
            <div class="workarea">
                <header></header>
                <div class="table-wrap">   
                    <table class="studies" id="studies" >
                        <thead>
                            <tr>
                                <td><input type="text"></td>
                                <td>ИИН</td>
                                <td>Пол</td>
                                <td>Дата рождения</td>
                                <td>Дата исследования</td>
                                <td>Описание</td>
                                <td>Источник</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="loader" class="loader"></div>
    
<?php
    require_once "partials/footer.php";
?>
