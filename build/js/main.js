"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            html = "";
            html += "<div class='info-panel'>";
            dataSeriesInfo.forEach(function (el) {
              html += "<p>Special character set -  ".concat(el.specCharSet, "</p>");
              html += "<p>Image Type -  ";
              el.imageType.forEach(function (sub) {
                html += "".concat(sub, ", ");
              });
              html += "</p>";
              html += "<p>Instance Creation Date -  ".concat(el.instanceDate, "</p>");
              html += "<p>Instance Creation Time -  ".concat(el.instanceTime, "</p>");
              html += "<p>SOP Class UID -  ".concat(el.SOPClass, "</p>");
              html += "<p>SOP Instance UID -  ".concat(el.SOPInstance, "</p>");
              html += "<p>Study Date-  ".concat(el.studyDate, "</p>");
              html += "<p>Series Date -  ".concat(el.seriesDate, "</p>"); // html+=`<p>SOP Instance UID -  ${el.SOPInstance}</p>`;
            });
            html += "</div>";
            $('#info').html(html);

          case 14:
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
    var id, html, getSiries, dataSeries;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = $(e.currentTarget).data('id');
            $('.sub-border').remove();
            console.log(id);
            html = "";

            if ($("tr[data-id=\"".concat(id, "\"]")).hasClass('open')) {
              _context2.next = 13;
              break;
            }

            _context2.next = 7;
            return fetch('./ajax/getSeries.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: 'id=' + id
            });

          case 7:
            getSiries = _context2.sent;
            _context2.next = 10;
            return getSiries.json();

          case 10:
            dataSeries = _context2.sent;
            console.log(dataSeries);
            dataSeries.forEach(function (el) {
              html += "<tr class='sub-border' data-seriesid=".concat(el.ser, " data-studiesid=").concat(el.study, ">");
              html += "<td class='sub-td' colspan=7>";
              html += "<div class=\"sub\" data-id=".concat(el.sop, ">");
              html += "<div>";
              html += "<span class='dots'><img src=\"src/icons/dots.png\"></span>";
              html += "<span class='download'><img src=\"src/icons/download.png\"></span>".concat(el.sop, "</div>");
              html += "<div>".concat(el.cmean, "</div>");
              html += "<div>".concat(el.mod, "</div>");
              html += "<div>".concat(el.ser, "</div>");
              html += "</div>";
              html += "</td>";
              html += "</tr>";
            });

          case 13:
            $("tr[data-id=\"".concat(id, "\"]")).toggleClass('open');
            $("tr[data-id=\"".concat(id, "\"]")).after(html);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loadSeries(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var load = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var loader, getPatients, dataPtients, html, options, table;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            loader = document.getElementsByClassName('.loader');
            loader.style = null;
            _context3.next = 4;
            return fetch('./ajax/getPatients.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "limit=10"
            });

          case 4:
            getPatients = _context3.sent;
            _context3.next = 7;
            return getPatients.json();

          case 7:
            dataPtients = _context3.sent;
            console.log(dataPtients);
            html = "";
            dataPtients.forEach(function (el) {
              html += "<tr class=\"table-row\" data-id=".concat(el.suid, " data-iin=\"").concat(el.iin, "\">");
              html += "<td data-id=".concat(el.suid, " data-iin=\"").concat(el.iin, "\" class=\"series main_td\"><img class=\"arrow-right icon\" src=\"src/icons/arrow_right_icon.png\"> ").concat(el.fio, "</td>");
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

            $('table.studies thead td.search').each(function () {
              var title = $(this).text();
              $(this).html('<input class="search" type="text"  placeholder="' + title + '">');
            });
            table.columns().every(function () {
              var that = this;
              var inputs = $("thead input");
              $(document).delegate("thead input", 'keyup change', function (e) {
                console.log($(e.currentTarget).val());
                table.search($(e.currentTarget).val()).rows().draw();
              });
              $("thead input").on('click', function (e) {
                e.stopPropagation();
              });
            });
            $(document).delegate('td.series', 'click', loadSeries);
            $(document).delegate('tr.sub-border', 'click', getSiriesInfo);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function load() {
    return _ref3.apply(this, arguments);
  };
}();

window.onload = load();
