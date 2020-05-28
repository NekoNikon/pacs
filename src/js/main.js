let download = async (e) => {
    let st = $(e.currentTarget).data('st');
    let ser = $(e.currentTarget).data('ser');
    // let ins = $(e.currentTarget).data('ins');
    let getDownload = await fetch("./ajax/download.php" , {
        method:'post',
        headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'},
        body:`st=${st}&ser=${ser}`
    });
    let dataDownload = await getDownload.text();
    console.log(dataDownload);
    window.location.href = "."+dataDownload;
}

let getSiriesInfo = async (e) => {
    $('.sub-border').removeClass('get');
    $(e.currentTarget).addClass('get');
    $('#info .info-panel .picture').html('<div id="loader-pic" class="loader-pic"></div>');
    let seriesID = $(e.currentTarget).data('seriesid');
    let studiesID = $(e.currentTarget).data('studiesid');
    // $(`.sub-border[data-seriesid=${seriesID}]`).addClass('get')
    let getInfo = await fetch('./ajax/getSeriesInfo.php' , {
        method:'post',
        headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'},
        body:`ser=${seriesID}&stu=${studiesID}`
    });
    let dataSeriesInfo = await getInfo.json();
    console.log(dataSeriesInfo);

    let html = "";
    html+="<div class='info'>";
    dataSeriesInfo.forEach(async el => {
        html+=`<p class="p-h5">${el.SOPInstance}</p>`;
        html+=`<p>Special character set (0008,0005)  -  ${el.specCharSet}</p>`;
        html+=`<p>Image Type (0008,0008)  -  `;
        el.imageType.forEach(sub=>{
            html+=`${sub}, `;
        });
        html+="</p>";
        html+=`<p>Instance Creation Date (0008,0012)  -   ${el.instanceDate}</p>`;
        html+=`<p>Instance Creation Time (0008,0013)  -  ${el.instanceTime}</p>`;
        html+=`<p>SOP Class UID (0008,0016)  -  ${el.SOPClass}</p>`;
        html+=`<p>SOP Instance UID (0008,0018)  -  ${el.SOPInstance}</p>`;
        html+=`<p>Study Date (0008,0020)  -  ${el.studyDate}</p>`;
        html+=`<p>Series Date (0008,0021)  -  ${el.seriesDate}</p>`;
    });

    let getPic = await fetch(`./ajax/getPictures.php?stu=${dataSeriesInfo[0].studyID}&ser=${dataSeriesInfo[0].seriesID}&ins=${dataSeriesInfo[0].SOPInstance}` ,{
        method:'GET',
        headers:{
            'Content-Type': 'application/dicom',
            'Accept': 'application/dicom+json',
        }
    });

    let dataPic = await getPic.text(); 
    
    let img = new Image(320 ,240);
    img.src = `data:image/jpeg;base64,${dataPic.replace('\r\n' , '')}`;
    html+="</div>";   
    html+="<div class='pic'>";
    html+="</div>";
    $('#info .info-panel .picture').html(html);
    $('#info .info-panel .picture .pic').html(img);
} 

$('#dateOfStudy').datepicker({
    language:'ru',
    clearBtn:true,
    format: 'dd-mm-yyyy'
});

let options = {
    dom:'t<"left"p>',
    language: {
        paginate: {
            next: '<img src="src/icons/pagi_arrow_right.png">', // or '→'
            previous: '<img src="src/icons/pagi_arrow_left.png">' // or '←' 
        }
    },
    scrollY: "500px",
    scrollCollapse: true,
    paging:  false,
    pageLength:15, 
    paging: true,
    bDestroy: true,
    bRetrieve: true,
    info: false,
    bLengthChange: false,
    responsive: true,
};


let table = $('table.studies').dataTable(options);
let tableApi = $('table.studies').dataTable().api();


let loadSeries = async (e) => {
    
    let id = $(e.currentTarget).data('id');
    $('.sub-border').remove();
    console.log(id);
    let html="";
    $('.info-panel .series').html('<div class="noselect"><p>Серия не выбрана. Просмотр не доступен</p></div>').addClass('no-pic').removeClass('pic-flex');
    $('#info .info-panel .picture').html('<div class="noselect"><p>Снимок не выбран. Просмотр не доступен</p><div>');
    if(!$(`tr[data-id="${id}"]`).hasClass('open')) {
        $(`tr.table-row`).removeClass('open');
        //load series
        $('.info-panel .series').html(' <div id="loader-series" class="loader-series"></div>')
        let getSiries = await fetch('./ajax/getSeries.php' , {method:'post',headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'} , body:'id='+id});
        let dataSeries = await getSiries.json();
        await dataSeries.forEach(async el => {
            html+=`<tr class='sub-border' data-seriesid=${el.ser} data-studiesid=${el.study}>`;
                html+="<td class='sub-td' colspan=7>"
                    html+=`<div class="sub" data-id=${el.sop}>`;
                        html+=`<div class="sop">`;
                            html+=`<span class='dots'><img src="src/icons/dots.png"></span>`
                            html+=`<span data-st='${el.study}' data-ser='${el.ser}'  class='download'><img src="src/icons/download.png"></span>${el.sop}</div>`;
                        html+=`<div class="cmean">${el.cmean}</div>`;
                        html+=`<div class="mod">${el.mod}</div>`;
                        html+=`<div class="ser">${el.ser}</div>`;
                    html+="</div>";
                html += "</td>";
            html += "</tr>";

            console.log(`st=${el.ser}`);
            
            let getInfo = await fetch('./ajax/getSeriesInfo.php' , {
                method:'post',
                headers:{'Content-type':'application/x-www-form-urlencoded'},
                body:`ser=${el.ser}&stu=${id}`
            });
            let dataSeriesInfo = await getInfo.json();
            let seriesInfo = dataSeriesInfo[0];
            
           
            console.log(`stu=${seriesInfo.studyID}&ser=${seriesInfo.seriesID}&ins=${seriesInfo.SOPInstance}`);
            var base64Flag = 'data:image/jpeg;base64,';
            
            let getInstances = await fetch(`./ajax/getPictures.php?stu=${seriesInfo.studyID}&ser=${seriesInfo.seriesID}&ins=${seriesInfo.SOPInstance}` ,{ 
                method:'GET',
                headers:{
                    'Content-Type': 'application/dicom',
                    'Accept': 'application/dicom+json',
                },
            });
            let picture = await getInstances.text();

            let img = new Image(150,130);
            
            img.src = `data:image/jpeg;base64,${picture.replace('\r\n' , '')}`;
            $('.info-panel .series').removeClass('no-pic').addClass('pic-flex');
            $('.info-panel .series').append(`<div data-instance='${seriesInfo.SOPInstance}' data-seriesid='${el.ser}' data-studiesid='${el.study}' class="pic-block"></div>`)
            $(`.info-panel .series .pic-block[data-instance='${seriesInfo.SOPInstance}']`).html(img);
            $(`.info-panel .series .pic-block[data-instance='${seriesInfo.SOPInstance}']`).append(`<p>${el.cmean}</p>`);
            $('#loader-series').remove();
        });

        
    }
    $(`tr[data-id="${id}"]`).toggleClass('open');
    $(`tr[data-id="${id}"]`).after(html);
}



let loadParamsPOSTStudy = () => {
    let params = {};
    let sDate = $('#dateOfStudy').val();
    if(sDate!="") {
        let _day = `${sDate[0]}${sDate[1]}`;
        let _month = `${sDate[3]}${sDate[4]}`;
        let _year = `${sDate[6]}${sDate[7]}${sDate[8]}${sDate[9]}`;
        sDate = `${_year}${_month}${_day}`;
        params.StudyDate=sDate;
    } 
    if(!$('#any').prop('checked')) {
        sDate =$("[name=times]:checked").data('time');
        params.StudyDate=sDate+"-";
    }
    let count = '';
    if($('#count').val()!='') {
        count="limit="+$('#count').val();
        params.limit=count;
    } 

    return params;
}

let loadParamsPOSTSeries = () => {
        let params = {};

        return params;
}

let load = async function (){
    // console.log(loadParamsPOSTStudy());
    $('#loader').css('display','block');
    let getCount = await fetch("./ajax/studyCount.php" , {
        method:'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(loadParamsPOSTStudy())
    });
    let dataCount = await getCount.json();
    $('#count').prop('placeholder', dataCount.count);

    let getPatients = await fetch('./ajax/getPatients.php',{
        method:'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(loadParamsPOSTStudy())
    });
    let dataPtients = await getPatients.json();
    console.log(dataPtients);

    $("table.studies tbody").html("");

    //init body of table
    tableApi.clear();
    var html = "";
    dataPtients.forEach(el => {
        html=`<tr class="table-row" data-id=${el.suid} data-iin="${el.iin}">`;
            html+=`<td data-id=${el.suid} data-iin="${el.iin}" class="series main_td"><img class="arrow arrow-right icon" src="src/icons/arrow_right_icon.png"> ${el.fio}</td>`;
            html+=`<td class="iin main_td" >${el.iin}</td>`;
            html+=`<td class="main_td">${el.sex}</td>`;
            html+=`<td class="main_td">${el.btd}</td>`;
            html+=`<td class="main_td">${el.sdate} ${el.stime}</td>`;
            html+=`<td class="main_td">${el.des}</td>`;
            html+=`<td class="main_td">${el.src}</td>`;
        html+="</tr>"
        tableApi.row.add($(html));
    });
    // $("table.studies tbody").html(html);
    tableApi.draw();
    $('#loader').css('display','none');

    // let table = $("table.studies").draw(); 
    tableApi.columns().every( function () {
        $(document).delegate("thead input" ,'keyup change', function (e) {
            tableApi.search($(e.currentTarget).val()).rows().draw();
        });
        $("thead .noclick").on('click' , function(e) {
            e.stopPropagation();
        }); 
    });
}

$(document).delegate('#search' , 'click' , load);
$(document).delegate('td.series' , 'click' , loadSeries);
$(document).delegate('tr.sub-border' , 'click' , getSiriesInfo);
$(document).delegate('div.pic-block' , 'click' , getSiriesInfo);
$(document).delegate('.download' , 'click' , download);

//radio
$(document).delegate('[name=times]' , 'click' , function() {
    $('#dateOfStudy').val('');
});
$(document).delegate('#dateOfStudy' , 'change' , function() {
    $('[name=times]').each(function() {
        $(this).prop('checked' , false);
    });
    $('#any').prop('checked' , true);
});

//checkbox
$(document).delegate('.modality' , 'click' , function(e) {
    console.log($(e.currentTarget));
    
    // if($('input').data('modality')=="ALL") {
    //     $('.modality input[type=checkbox]').prop('checked',false);
    //     $('.modality input').prop('checked', true);
    // }
    // else {
    //     $('.modality input').prop('checked', false);
    // }
    
});

window.onload = load();

