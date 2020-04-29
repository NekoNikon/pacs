let loadSeries = async (e) => {
    let id = $(e.currentTarget).data('id');
    console.log(id);

    let getSiries = await fetch('./ajax/getSeries.php' , {method:'post',headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'} , body:'id='+id});
    let dataSeries = await getSiries.json();
    console.log(dataSeries);
    let html="";
    dataSeries.forEach(el => {
        html+="<tr class='sub-border'>";
        html+="<td class='sub-td' colspan=7>"
        html+=`<div class="sub" data-id=${el.sop}>`;
            html+=`<div>`;
                html+=`<span class='dots'><img src="src/icons/dots.png"></span>`
                html+=`<span class='download'><img src="src/icons/download.png"></span>${el.sop}</div>`;
            html+=`<div>${el.cmean}</div>`;
            html+=`<div>${el.mod}</div>`;
        html+="</div>";
        html += "</td>";
        html += "</tr>";
    });
    $('.sub-border').remove();
    $(`tr[data-id="${id}"]`).after(html);
}


let load = async function (){
    let loader = document.getElementsByClassName('.loader');
    loader.style=null;
    let getPatients = await fetch('./ajax/getPatients.php',{method:'post',headers:{'Content-type' :  'application/x-www-form-urlencoded;charset=utf-8'},body:"limit=10"});
    let dataPtients = await getPatients.json();
    console.log(dataPtients);
        
    var html = "";
    dataPtients.forEach(el => {
        html+=`<tr class="table-row" data-id=${el.suid} data-iin="${el.iin}">`;
            html+=`<td data-id=${el.suid} data-iin="${el.iin}" class="series main_td"><img class="arrow-right icon" src="src/icons/arrow_right_icon.png"> ${el.fio}</td>`;
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
    let table = $("table.studies").DataTable({
        "aoColumns": [
            {"sType": "string"},
            {"sType": "string"},
            {"sType": "string"},
            {"sType": "string"},
            {"sType": "string"},
            {"sType": "string"},
            {"sType": "string"}
        ],
        info: false, 
        bLengthChange: false,
        bFilter: false,
        language: {
            paginate: {
                next: '<img src="src/icons/pagi_arrow_right.png">', // or '→'
                previous: '<img src="src/icons/pagi_arrow_left.png">' // or '←' 
            }
        }
    });



    $(document).delegate('td.series' , 'click' , loadSeries);
}

window.onload = load();
