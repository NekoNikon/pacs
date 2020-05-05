<?php
    include_once "config.php";
    require_once "partials/header.php";
    // $res = $server->getPatients();
    // echo "<pre>";
    // print_r($res[0]);
    // echo "</pre>";
?>

    <div class="row">
        <div class="col-md-12">
            <table class="studies table  w-100" id="studies" >
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
                <tbody>
                    
                </tbody>
                
            </table>
        </div>
    </div>


    <div id="info"></div>
    <div id="loader" class="loader"></div>
    
<?php
    require_once "partials/footer.php";
?>
