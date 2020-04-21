<?php
    include_once "config.php";
    require_once "partials/header.php";
    // $res = $server->getPatients();
    // echo "<pre>";
    // print_r($res[0]);
    // echo "</pre>";
?>
    <div class="container">
        <div class="sideleft">
        
        </div>

        <div class="main">
            <div class="workarea">
                <header></header>
                <table class="patients" >
                    <thead>
                        <tr>
                            <td>ФИО</td>
                            <td>ИИН</td>
                            <td>Пол</td>
                            <td>Дата рождения</td>
                            <td>Дата исследования</td>
                            <td>Описнаие</td>
                            <td>Источник</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fio">Фамилия Имя Отчество</td>
                            <td class="iin"><span>123456789012</span></td>
                            <td class="sex">М</td>
                            <td class="bdt">09.09.1998</td>
                            <td class="sdt">01.01.2020 13:00:11</td>
                            <td class="des">Снимок грудной клетки</td>
                            <td class="src">ORTHANC-3GP</td>
                        </tr>
                        <tr class="sub">
                            <td colspan=7>
                                <table class="serias"   >
                                    <tr>
                                        <td>some</td>
                                        <td>some</td>
                                        <td>some</td>
                                    </tr>
                                </table> 
                            </td>
                                                       
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
<?php
    require_once "partials/footer.php";
?>
<script >
        var studies = [];
        $(document).ready(function() {
            $.ajax({
                type:'POST',
                url:'./ajax/getPatients.php',
                dataType:"json",
                data:{},
                success:function(response) {
                    // console.log(response);
                    response.forEach(function(el) {
                        console.log(el);
                        studies.push({
                            uid:el['0020000D'].Value[0];
                            fio:el['00100010'].Value[0].Alphabetic;
                            
                        })                
                    });
                }
            }) 
        });
    </script>