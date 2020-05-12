
let getSiriesInfo = async (e) => {
    let seriesID = $(e.currentTarget).data('seriesid');
    let studiesID = $(e.currentTarget).data('studiesid');

    let getInfo = await fetch('./ajax/getSeriesInfo.php' , {
        method:'post',
        headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'},
        body:`ser=${seriesID}&stu=${studiesID}`
    });
    let dataSeriesInfo = await getInfo.json();
    console.log(dataSeriesInfo);

    let html = "";
    html+="<div class='info-panel'>";
        dataSeriesInfo.forEach(el => {
            html+=`<p>Special character set -  ${el.specCharSet}</p>`;
            html+=`<p>Image Type -  `;
            el.imageType.forEach(sub=>{
                html+=`${sub}, `;
            });
            html+="</p>";
            html+=`<p>Instance Creation Date -  ${el.instanceDate}</p>`;
            html+=`<p>Instance Creation Time -  ${el.instanceTime}</p>`;
            html+=`<p>SOP Class UID -  ${el.SOPClass}</p>`;
            html+=`<p>SOP Instance UID -  ${el.SOPInstance}</p>`;
            html+=`<p>Study Date-  ${el.studyDate}</p>`;
            html+=`<p>Series Date -  ${el.seriesDate}</p>`;
            // html+=`<p>SOP Instance UID -  ${el.SOPInstance}</p>`;
        });
    html+="</div>";  
    $('#info').html(html);
} 


let loadSeries = async (e) => {
    let id = $(e.currentTarget).data('id');
    $('.sub-border').remove();
    console.log(id);
    let html="";
    if(!$(`tr[data-id="${id}"]`).hasClass('open')) {
        let getSiries = await fetch('./ajax/getSeries.php' , {method:'post',headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'} , body:'id='+id});
        let dataSeries = await getSiries.json();
        console.log(dataSeries);
        dataSeries.forEach(el => {
            html+=`<tr class='sub-border' data-seriesid=${el.ser} data-studiesid=${el.study}>`;
            html+="<td class='sub-td' colspan=7>"
            html+=`<div class="sub" data-id=${el.sop}>`;
                html+=`<div>`;
                    html+=`<span class='dots'><img src="src/icons/dots.png"></span>`
                    html+=`<span class='download'><img src="src/icons/download.png"></span>${el.sop}</div>`;
                html+=`<div>${el.cmean}</div>`;
                html+=`<div>${el.mod}</div>`;
                html+=`<div>${el.ser}</div>`;
            html+="</div>";
            html += "</td>";
            html += "</tr>";
        });

    }
    $(`tr[data-id="${id}"]`).toggleClass('open');
    $(`tr[data-id="${id}"]`).after(html);
}


let load = async function (){
    $('#dateOfStudy').datepicker({
        language:'ru',
        clearBtn:true
    });

    let loader = document.getElementsByClassName('.loader');
    loader.style=null;
    let getPatients = await fetch('./ajax/getPatients.php',{method:'post',headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'},body:"limit=10"});
    let dataPtients = await getPatients.json();
    console.log(dataPtients);

    var html = "";
    dataPtients.forEach(el => {
        html+=`<tr class="table-row" data-id=${el.suid} data-iin="${el.iin}">`;
            html+=`<td data-id=${el.suid} data-iin="${el.iin}" class="series main_td"><img class="arrow arrow-right icon" src="src/icons/arrow_right_icon.png"> ${el.fio}</td>`;
            html+=`<td class="iin main_td" >${el.iin}</td>`;
            html+=`<td class="main_td">${el.sex}</td>`;
            html+=`<td class="main_td">${el.btd}</td>`;
            html+=`<td class="main_td">${el.sdate} ${el.stime}</td>`;
            html+=`<td class="main_td">${el.des}</td>`;
            html+=`<td class="main_td">${el.src}</td>`;
        html+="</tr>"
    });
    $("table.studies tbody").html(html);
    $('#loader').css('display','none');
    
    let options = {
        dom:'t<"left"p>',
        language: {
            paginate: {
                next: '<img src="src/icons/pagi_arrow_right.png">', // or '→'
                previous: '<img src="src/icons/pagi_arrow_left.png">' // or '←' 
            }
        },
        // scrollY: "400px",
        // scrollCollapse: false,
        bDestroy: true,
        bRetrieve: true,
        info: false,
        bLengthChange: false,
        responsive: true, 

    };

    let table = $("table.studies").DataTable(options);

    // generate search inputs
    $('table.studies thead td.search').each(function(i,e) {
        let title = $(this).text();
        $(this).html(`<div class="search-block clearable">
            <input data-id='+i+' class="search noclick" type="search"  placeholder=${title}> 
            <i class="fa fa-search noclick"></i>
        </div>`); 
    })

    table.columns().every( function () {
        var that = this;
        var inputs = $("thead input");
        $(document).delegate("thead input" ,'keyup change', function (e) { 
             
            table.search($(e.currentTarget).val()).rows().draw();
        });
        $("thead .noclick").on('click' , function(e) {
            e.stopPropagation();
        });
    });

 
    $(document).delegate('td.series' , 'click' , loadSeries);
    $(document).delegate('tr.sub-border' , 'click' , getSiriesInfo);

    var panel="";
    panel+=
    `<div class='info-panel row'>
        <div class="col-6 info-block series"><div class="noselect"><p>Серия не выбрана. Просмотр не доступен</p></div></div>
        <div class="col-6 info-block picture"><div class="noselect"><p>Снимок не выбран. Просмотр не доступен</p><div></div>
    </div>`;
    $('#info').html(panel);
}

window.onload = load();

