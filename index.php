<?php
    include_once "config.php";
    require_once "partials/header.php";
?>  
<header id="header" class="row header">
    <div class="left col-7">
        <input id="dateOfStudy" type="text" placeholder="Дата исследования">
        
        <!-- <div class='radio' data-radio="today"><i class="fa fa-circle"></i></div> -->
        <div class="radio-item">
            <input data-time="<?php echo getAgo("0"); ?>" checked=true type="radio" name="times" value="today" id="today" >
            <label for="today">Сегодня</label>
        </div>
        <!-- <div class='radio' data-radio="sevenday"><i class="fa fa-circle"></i></div> -->
        <div class="radio-item">
            <input data-time="<?php echo getAgo("7"); ?>" type="radio" name="times" value="sevenday" id="sevenday">
            <label for="sevenday">7Д</label>
        </div>
        <!-- <div class='radio' data-radio="month"><i class="fa fa-circle"></i></div> -->
        <div class="radio-item">
            <input data-time="<?php echo getAgo("30"); ?>"  type="radio" name="times" value="month" id="month">
            <label for="month">1М</label>
        </div>
        <!-- <div class='radio' data-radio="year"><i class="fa fa-circle"></i></div> -->
        <div class="radio-item">
            <input data-time="<?php echo getAgo("365"); ?>"  type="radio" name="times" value="year" id="year">
            <label for="year">1Г</label>
        </div>
        <!-- <div class='radio' data-radio="any"><i class="fa fa-circle"></i></div> -->
        <div class="radio-item">
            <input data-time="<?php echo getAgo("0"); ?>"  type="radio" name="times" value="any" id="any">
            <label for="any">Любая дата</label>
        </div>
        <input id="count" type="number" value=""  min=0 placeholder="Count">
        <button id="search" ><i class="fa fa-search"></i></button>
    </div>
    <div class="col-5 right">
        <div class="float-right">
        <label class="container-checkbox modality">Все
            <input data-modality="ALL" type="checkbox" checked="checked">
            <span class="checkmark"></span>
        </label>
        <label class="container-checkbox modality">CR
            <input data-modality="CR" type="checkbox">
            <span class="checkmark"></span>
        </label>
        <label class="container-checkbox modality">CT
            <input data-modality="CT" type="checkbox">
            <span class="checkmark"></span>
        </label>
        <label class="container-checkbox modality">DX
            <input data-modality="DX" type="checkbox">
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
                        <label class="container-checkbox modality">CR
                            <input data-modality="CR" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-checkbox modality">CT
                            <input data-modality="CT" type="checkbox">
                            <span class="checkmark"></span>
                        </label>    
                        <label class="container-checkbox modality">DX
                            <input data-modality="DX" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-checkbox modality">ET
                            <input data-modality="ET" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="col-6">
                        <label class="container-checkbox modality">NI
                            <input data-modality="NI" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-checkbox modality">KO
                            <input data-modality="KO" type="checkbox">
                            <span class="checkmark"></span>
                        </label>    
                        <label class="container-checkbox modality">NM
                            <input data-modality="NM" type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-checkbox modality">EE
                            <input data-modality="EE" type="checkbox">
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

    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <table class="studies table  w-100" id="studies">
                    <thead>
                        <tr>
                            <td class="search"> 
                                <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='ФИО'>
                                <i class="fa fa-search noclick"></i>
                            </div> 
                            </td>
                            <td class="search"> <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='ИИН'>
                                <i class="fa fa-search noclick"></i>
                            </div>
                            </td>
                            <td>Пол </td>
                            <td class="search"> <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='Дата рождения'>
                                <i class="fa fa-search noclick"></i>
                            </div>
                            </td>
                            <td class="search"> <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='Дата исследования'>
                                <i class="fa fa-search noclick"></i>
                            </div> 
                            </td>
                            <td class="search"> <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='Описание'>
                                <i class="fa fa-search noclick"></i>
                            </div> 
                            </td>
                            <td class="search"> <div class="search-block clearable">
                                <input data-id='${i}' class=" search noclick" type="search"  placeholder='Источник'>
                                <i class="fa fa-search noclick"></i>
                            </div>
                            </td>
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
                    <div class="col-6 info-block series no-pic"><div class="noselect"><p>Серия не выбрана. Просмотр не доступен</p></div></div>
                    <div class="col-6 info-block picture"><div class="noselect"><p>Снимок не выбран. Просмотр не доступен</p><div></div>
                </div>   
            </div>
        </div>
    </div>
    
<?php
    require_once "partials/footer.php";
?>
