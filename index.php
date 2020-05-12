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
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h4>Pictures</h4>
                    </div>
                    <div class="card-body">

                    </div>
                </div>
            </div>
            <!-- /# column -->

            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h4>Info series</h4>
                    </div>
                    <div class="card-body">

                    </div>
                </div>
            </div>
            <!-- /# column -->
        </div>
    </div>
    
    


    
    <div id="loader" class="loader"></div>
    
<?php
    require_once "partials/footer.php";
?>
