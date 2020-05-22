"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var download = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var st, ser, getDownload, dataDownload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            st = $(e.currentTarget).data('st');
            ser = $(e.currentTarget).data('ser'); // let ins = $(e.currentTarget).data('ins');

            _context.next = 4;
            return fetch("./ajax/download.php", {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "st=".concat(st, "&ser=").concat(ser)
            });

          case 4:
            getDownload = _context.sent;
            _context.next = 7;
            return getDownload.text();

          case 7:
            dataDownload = _context.sent;
            console.log(dataDownload);
            window.location.href = "." + dataDownload;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function download(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSiriesInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
    var seriesID, studiesID, getInfo, dataSeriesInfo, html, getPic, dataPic, img;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            $('#info .info-panel .picture').html('<div id="loader-pic" class="loader-pic"></div>');
            seriesID = $(e.currentTarget).data('seriesid');
            studiesID = $(e.currentTarget).data('studiesid');
            _context3.next = 5;
            return fetch('./ajax/getSeriesInfo.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "ser=".concat(seriesID, "&stu=").concat(studiesID)
            });

          case 5:
            getInfo = _context3.sent;
            _context3.next = 8;
            return getInfo.json();

          case 8:
            dataSeriesInfo = _context3.sent;
            console.log(dataSeriesInfo);
            html = "";
            html += "<div class='info'>";
            dataSeriesInfo.forEach( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(el) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        html += "<p class=\"p-h5\">".concat(el.SOPInstance, "</p>");
                        html += "<p>Special character set (0008,0005)  -  ".concat(el.specCharSet, "</p>");
                        html += "<p>Image Type (0008,0008)  -  ";
                        el.imageType.forEach(function (sub) {
                          html += "".concat(sub, ", ");
                        });
                        html += "</p>";
                        html += "<p>Instance Creation Date (0008,0012)  -   ".concat(el.instanceDate, "</p>");
                        html += "<p>Instance Creation Time (0008,0013)  -  ".concat(el.instanceTime, "</p>");
                        html += "<p>SOP Class UID (0008,0016)  -  ".concat(el.SOPClass, "</p>");
                        html += "<p>SOP Instance UID (0008,0018)  -  ".concat(el.SOPInstance, "</p>");
                        html += "<p>Study Date (0008,0020)  -  ".concat(el.studyDate, "</p>");
                        html += "<p>Series Date (0008,0021)  -  ".concat(el.seriesDate, "</p>");

                      case 11:
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
            _context3.next = 15;
            return fetch("./ajax/getPictures.php?stu=".concat(dataSeriesInfo[0].studyID, "&ser=").concat(dataSeriesInfo[0].seriesID, "&ins=").concat(dataSeriesInfo[0].SOPInstance), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/dicom',
                'Accept': 'application/dicom+json'
              }
            });

          case 15:
            getPic = _context3.sent;
            _context3.next = 18;
            return getPic.text();

          case 18:
            dataPic = _context3.sent;
            img = new Image(350, 300);
            img.src = "data:image/jpeg;base64,".concat(dataPic.replace('\r\n', ''));
            html += "</div>";
            html += "<div class='pic'>"; // html+=img;

            html += "</div>";
            $('#info .info-panel .picture').html(html);
            $('#info .info-panel .picture .pic').html(img);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getSiriesInfo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

$('#dateOfStudy').datepicker({
  language: 'ru',
  clearBtn: true,
  format: 'dd-mm-yyyy'
});

var loadSeries = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
    var id, html, getSiries, dataSeries;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = $(e.currentTarget).data('id');
            $('.sub-border').remove();
            console.log(id);
            html = "";
            $('.info-panel .series').html("");
            $('#info .info-panel .picture').html("");

            if ($("tr[data-id=\"".concat(id, "\"]")).hasClass('open')) {
              _context5.next = 16;
              break;
            }

            //load series
            $('.info-panel .series').html(' <div id="loader-series" class="loader-series"></div>');
            _context5.next = 10;
            return fetch('./ajax/getSeries.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: 'id=' + id
            });

          case 10:
            getSiries = _context5.sent;
            _context5.next = 13;
            return getSiries.json();

          case 13:
            dataSeries = _context5.sent;
            _context5.next = 16;
            return dataSeries.forEach( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(el) {
                var getInfo, dataSeriesInfo, seriesInfo, base64Flag, getInstances, picture, img;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        html += "<tr class='sub-border' data-seriesid=".concat(el.ser, " data-studiesid=").concat(el.study, ">");
                        html += "<td class='sub-td' colspan=7>";
                        html += "<div class=\"sub\" data-id=".concat(el.sop, ">");
                        html += "<div class=\"sop\">";
                        html += "<span class='dots'><img src=\"src/icons/dots.png\"></span>";
                        html += "<span data-st='".concat(el.study, "' data-ser='").concat(el.ser, "'  class='download'><img src=\"src/icons/download.png\"></span>").concat(el.sop, "</div>");
                        html += "<div class=\"cmean\">".concat(el.cmean, "</div>");
                        html += "<div class=\"mod\">".concat(el.mod, "</div>");
                        html += "<div class=\"ser\">".concat(el.ser, "</div>");
                        html += "</div>";
                        html += "</td>";
                        html += "</tr>";
                        console.log("st=".concat(el.ser));
                        _context4.next = 15;
                        return fetch('./ajax/getSeriesInfo.php', {
                          method: 'post',
                          headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                          },
                          body: "ser=".concat(el.ser, "&stu=").concat(id)
                        });

                      case 15:
                        getInfo = _context4.sent;
                        _context4.next = 18;
                        return getInfo.json();

                      case 18:
                        dataSeriesInfo = _context4.sent;
                        seriesInfo = dataSeriesInfo[0];
                        console.log("stu=".concat(seriesInfo.studyID, "&ser=").concat(seriesInfo.seriesID, "&ins=").concat(seriesInfo.SOPInstance));
                        base64Flag = 'data:image/jpeg;base64,';
                        _context4.next = 24;
                        return fetch("./ajax/getPictures.php?stu=".concat(seriesInfo.studyID, "&ser=").concat(seriesInfo.seriesID, "&ins=").concat(seriesInfo.SOPInstance), {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/dicom',
                            'Accept': 'application/dicom+json'
                          }
                        });

                      case 24:
                        getInstances = _context4.sent;
                        _context4.next = 27;
                        return getInstances.text();

                      case 27:
                        picture = _context4.sent;
                        img = new Image(150, 130);
                        img.src = "data:image/jpeg;base64,".concat(picture.replace('\r\n', ''));
                        $('.info-panel .series').append("<div data-instance='".concat(seriesInfo.SOPInstance, "' class=\"pic-block\"></div>"));
                        $(".info-panel .series .pic-block[data-instance='".concat(seriesInfo.SOPInstance, "']")).html(img);
                        $('#loader-series').remove();

                      case 33:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 16:
            $("tr[data-id=\"".concat(id, "\"]")).toggleClass('open');
            $("tr[data-id=\"".concat(id, "\"]")).after(html);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function loadSeries(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var loadParamsPOST = function loadParamsPOST() {
  var params = {};
  var sDate = $('#dateOfStudy').val();

  if (sDate != "") {
    var _day = "".concat(sDate[0]).concat(sDate[1]);

    var _month = "".concat(sDate[3]).concat(sDate[4]);

    var _year = "".concat(sDate[6]).concat(sDate[7]).concat(sDate[8]).concat(sDate[9]);

    sDate = "".concat(_year).concat(_month).concat(_day);
    params.StudyDate = sDate + "-";
  }

  if (!$('#any').prop('checked')) {
    sDate = "StudyDate=" + $("[name=times]:checked").data('time') + "-";
    params.StudyDate = sDate;
  }

  var count = '';

  if ($('#count').val() != '') {
    count = "limit=" + $('#count').val();
    params.limit = count;
  } // console.log(sDate); 


  return params;
};

var load = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var loader, getPatients, dataPtients, html, options, table;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(loadParamsPOST());
            loader = document.getElementsByClassName('.loader');
            loader.style = null;
            _context6.next = 5;
            return fetch('./ajax/getPatients.php', {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loadParamsPOST())
            });

          case 5:
            getPatients = _context6.sent;
            _context6.next = 8;
            return getPatients.json();

          case 8:
            dataPtients = _context6.sent;
            console.log(dataPtients); //init header of table

            $("table.studies thead").html("<tr>\n        <td class=\"search\"> \u0424\u0418\u041E</td>\n        <td class=\"search\"> \u0418\u0418\u041D</td>\n        <td> \u041F\u043E\u043B</td>\n        <td class=\"search\"> \u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F</td>\n        <td class=\"search\"> \u0414\u0430\u0442\u0430 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F</td>\n        <td class=\"search\"> \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</td>\n        <td class=\"search\"> \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A</td>\n    </tr>");
            $("table.studies tbody").html(""); //init body of table

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
            table = $("table.studies").DataTable(options).draw(); // generate search inputs

            $('table.studies thead td.search').each(function (i, e) {
              var title = $(this).text();
              $(this).html("<div class=\"search-block clearable\">\n            <input data-id='".concat(i, "' class=\" search noclick\" type=\"search\"  placeholder='").concat(title, "'>\n            <i class=\"fa fa-search noclick\"></i>\n        </div>"));
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

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function load() {
    return _ref6.apply(this, arguments);
  };
}();

$(document).delegate('#search', 'click', load);
$(document).delegate('td.series', 'click', loadSeries);
$(document).delegate('tr.sub-border', 'click', getSiriesInfo);
$(document).delegate('.download', 'click', download);
$(document).delegate('[name=times]', 'click', function () {
  $('#dateOfStudy').val('');
});
$(document).delegate('#dateOfStudy', 'change', function () {
  $('[name=times]').each(function () {
    $(this).prop('checked', false);
  });
  $('#any').prop('checked', true);
});
window.onload = load();
