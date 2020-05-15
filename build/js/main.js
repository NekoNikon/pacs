"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(function (b) {
    return binary += String.fromCharCode(b);
  });
  return window.btoa(binary);
}

;

var getSiriesInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var seriesID, studiesID, getInfo, dataSeriesInfo, html;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            seriesID = $(e.currentTarget).data('seriesid');
            studiesID = $(e.currentTarget).data('studiesid');
            _context.next = 4;
            return fetch('./ajax/getSeriesInfo.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "ser=".concat(seriesID, "&stu=").concat(studiesID)
            });

          case 4:
            getInfo = _context.sent;
            _context.next = 7;
            return getInfo.json();

          case 7:
            dataSeriesInfo = _context.sent;
            console.log(dataSeriesInfo);
            html = ""; // html+="<div class='card info-panel'>";
            //     dataSeriesInfo.forEach(el => {
            //         html+=`<p>Special character set -  ${el.specCharSet}</p>`;
            //         html+=`<p>Image Type -  `;
            //         el.imageType.forEach(sub=>{
            //             html+=`${sub}, `;
            //         });
            //         html+="</p>";
            //         html+=`<p>Instance Creation Date -  ${el.instanceDate}</p>`;
            //         html+=`<p>Instance Creation Time -  ${el.instanceTime}</p>`;
            //         html+=`<p>SOP Class UID -  ${el.SOPClass}</p>`;
            //         html+=`<p>SOP Instance UID -  ${el.SOPInstance}</p>`;
            //         html+=`<p>Study Date-  ${el.studyDate}</p>`;
            //         html+=`<p>Series Date -  ${el.seriesDate}</p>`;
            //         // html+=`<p>SOP Instance UID -  ${el.SOPInstance}</p>`;
            //     });
            // html+="</div>";  
            // $('#info').html(html);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSiriesInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

var loadSeries = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
    var id, html, getSiries, dataSeries;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = $(e.currentTarget).data('id');
            $('.sub-border').remove();
            console.log(id);
            html = "";
            $('.info-panel .series').html('');

            if ($("tr[data-id=\"".concat(id, "\"]")).hasClass('open')) {
              _context3.next = 14;
              break;
            }

            _context3.next = 8;
            return fetch('./ajax/getSeries.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: 'id=' + id
            });

          case 8:
            getSiries = _context3.sent;
            _context3.next = 11;
            return getSiries.json();

          case 11:
            dataSeries = _context3.sent;
            _context3.next = 14;
            return dataSeries.forEach( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(el) {
                var getInfo, dataSeriesInfo, seriesInfo, base64Flag, getInstances, picture, img;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        html += "<tr class='sub-border' data-seriesid=".concat(el.ser, " data-studiesid=").concat(el.study, ">");
                        html += "<td class='sub-td' colspan=7>";
                        html += "<div class=\"sub\" data-id=".concat(el.sop, ">");
                        html += "<div class=\"sop\">";
                        html += "<span class='dots'><img src=\"src/icons/dots.png\"></span>";
                        html += "<span class='download'><img src=\"src/icons/download.png\"></span>".concat(el.sop, "</div>");
                        html += "<div class=\"cmean\">".concat(el.cmean, "</div>");
                        html += "<div class=\"mod\">".concat(el.mod, "</div>");
                        html += "<div class=\"ser\">".concat(el.ser, "</div>");
                        html += "</div>";
                        html += "</td>";
                        html += "</tr>";
                        console.log("st=".concat(el.ser));
                        _context2.next = 15;
                        return fetch('./ajax/getSeriesInfo.php', {
                          method: 'post',
                          headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                          },
                          body: "ser=".concat(el.ser, "&stu=").concat(id)
                        });

                      case 15:
                        getInfo = _context2.sent;
                        _context2.next = 18;
                        return getInfo.json();

                      case 18:
                        dataSeriesInfo = _context2.sent;
                        seriesInfo = dataSeriesInfo[0];
                        console.log("stu=".concat(seriesInfo.studyID, "&ser=").concat(seriesInfo.seriesID, "&ins=").concat(seriesInfo.SOPInstance)); // let params  = {"stu":seriesInfo.studyID,"ser":seriesInfo.seriesID, "ins":seriesInfo.SOPInstance};

                        base64Flag = 'data:image/jpeg;base64,';
                        _context2.next = 24;
                        return fetch("./ajax/getPictures.php?stu=".concat(seriesInfo.studyID, "&ser=").concat(seriesInfo.seriesID, "&ins=").concat(seriesInfo.SOPInstance), {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/dicom',
                            'Accept': 'application/dicom+json'
                          }
                        });

                      case 24:
                        getInstances = _context2.sent;
                        _context2.next = 27;
                        return getInstances.text();

                      case 27:
                        picture = _context2.sent;
                        // var imageStr = arrayBufferToBase64(picture);
                        // console.log(imageStr);
                        // let pic = URL.createObjectURL(picture);
                        img = new Image(120, 90);
                        img.src = "data:image/jpeg;base64,".concat(picture.replace('\r\n', ''));
                        $('.info-panel .series').append(img);

                      case 31:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 14:
            $("tr[data-id=\"".concat(id, "\"]")).toggleClass('open');
            $("tr[data-id=\"".concat(id, "\"]")).after(html);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function loadSeries(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var load = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var loader, getPatients, dataPtients, html, options, table;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            $('#dateOfStudy').datepicker({
              language: 'ru',
              clearBtn: true
            });
            loader = document.getElementsByClassName('.loader');
            loader.style = null;
            _context4.next = 5;
            return fetch('./ajax/getPatients.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "limit=10"
            });

          case 5:
            getPatients = _context4.sent;
            _context4.next = 8;
            return getPatients.json();

          case 8:
            dataPtients = _context4.sent;
            console.log(dataPtients);
            html = "";
            dataPtients.forEach(function (el) {
              html += "<tr class=\"table-row\" data-id=".concat(el.suid, " data-iin=\"").concat(el.iin, "\">");
              html += "<td data-id=".concat(el.suid, " data-iin=\"").concat(el.iin, "\" class=\"series main_td\"><img class=\"arrow arrow-right icon\" src=\"src/icons/arrow_right_icon.png\"> ").concat(el.fio, "</td>");
              html += "<td class=\"iin main_td\" >".concat(el.iin, "</td>");
              html += "<td class=\"main_td\">".concat(el.sex, "</td>");
              html += "<td class=\"main_td\">".concat(el.btd, "</td>");
              html += "<td class=\"main_td\">".concat(el.sdate, " ").concat(el.stime, "</td>");
              html += "<td class=\"main_td\">".concat(el.des, "</td>");
              html += "<td class=\"main_td\">".concat(el.src, "</td>");
              html += "</tr>";
            });
            $("table.studies tbody").html(html);
            $('#loader').css('display', 'none');
            options = {
              dom: 't<"left"p>',
              language: {
                paginate: {
                  next: '<img src="src/icons/pagi_arrow_right.png">',
                  // or '→'
                  previous: '<img src="src/icons/pagi_arrow_left.png">' // or '←' 

                }
              },
              bDestroy: true,
              bRetrieve: true,
              info: false,
              bLengthChange: false,
              responsive: true
            };
            table = $("table.studies").DataTable(options); // generate search inputs

            $('table.studies thead td.search').each(function (i, e) {
              var title = $(this).text();
              $(this).html("<div class=\"search-block clearable\">\n            <input data-id='+i+' class=\"search noclick\" type=\"search\"  placeholder='".concat(title, "'>\n            <i class=\"fa fa-search noclick\"></i>\n        </div>"));
            });
            table.columns().every(function () {
              var that = this;
              var inputs = $("thead input");
              $(document).delegate("thead input", 'keyup change', function (e) {
                table.search($(e.currentTarget).val()).rows().draw();
              });
              $("thead .noclick").on('click', function (e) {
                e.stopPropagation();
              });
            });
            $(document).delegate('td.series', 'click', loadSeries);
            $(document).delegate('tr.sub-border', 'click', getSiriesInfo);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function load() {
    return _ref4.apply(this, arguments);
  };
}();

window.onload = load();
