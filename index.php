<?php
    include_once "config.php";
    require_once "partials/header.php";
    // $res = $server->getPatients();
    // echo "<pre>";
    // print_r($res[0]);
    // echo "</pre>";
?>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <table class="studies table  w-100" id="studies">
                    <thead>
                        <tr>
                            <td class="search"> Fio</td>
                            <td class="search"> ИИН</td>
                            <td>Пол</td>
                            <td class="search"> Дата рождения</td>
                            <td class="search"> Дата исследования</td>
                            <td class="search"> Описание</td>
                            <td class="search"> Источник</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="wrap-footer" class="row">
        <div id="footer" class="col-lg-12">
            <div id="info" class="card">
                <div class='info-panel'>
                    <div class="col-6 info-block series pic-flex"><div class="noselect"><p>Серия не выбрана. Просмотр не доступен</p></div></div>
                    <div class="col-6 info-block picture"><div class="noselect"><p>Снимок не выбран. Просмотр не доступен</p><div></div>
                </div>   
            </div>
        </div>
    </div>
    


    
    
    
<?php
    require_once "partials/footer.php";
?>
