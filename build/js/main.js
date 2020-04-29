"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loadSeries = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var id, getSiries, dataSeries, html;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = $(e.currentTarget).data('id');
            console.log(id);
            _context.next = 4;
            return fetch('./ajax/getSeries.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: 'id=' + id
            });

          case 4:
            getSiries = _context.sent;
            _context.next = 7;
            return getSiries.json();

          case 7:
            dataSeries = _context.sent;
            console.log(dataSeries);
            html = "";
            dataSeries.forEach(function (el) {
              html += "<tr class='sub-border'>";
              html += "<td class='sub-td' colspan=7>";
              html += "<div class=\"sub\" data-id=".concat(el.sop, ">");
              html += "<div>";
              html += "<span class='dots'><img src=\"src/icons/dots.png\"></span>";
              html += "<span class='download'><img src=\"src/icons/download.png\"></span>".concat(el.sop, "</div>");
              html += "<div>".concat(el.cmean, "</div>");
              html += "<div>".concat(el.mod, "</div>");
              html += "</div>";
              html += "</td>";
              html += "</tr>";
            });
            $('.sub-border').remove();
            $("tr[data-id=\"".concat(id, "\"]")).after(html);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadSeries(_x) {
    return _ref.apply(this, arguments);
  };
}();

var load = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var loader, getPatients, dataPtients, html, table;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            loader = document.getElementsByClassName('.loader');
            loader.style = null;
            _context2.next = 4;
            return fetch('./ajax/getPatients.php', {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              body: "limit=10"
            });

          case 4:
            getPatients = _context2.sent;
            _context2.next = 7;
            return getPatients.json();

          case 7:
            dataPtients = _context2.sent;
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
            table = $("table.studies").DataTable({
              "aoColumns": [{
                "sType": "string"
              }, {
                "sType": "string"
              }, {
                "sType": "string"
              }, {
                "sType": "string"
              }, {
                "sType": "string"
              }, {
                "sType": "string"
              }, {
                "sType": "string"
              }],
              info: false,
              bLengthChange: false,
              bFilter: false,
              language: {
                paginate: {
                  next: '<img src="src/icons/pagi_arrow_right.png">',
                  // or '→'
                  previous: '<img src="src/icons/pagi_arrow_left.png">' // or '←' 

                }
              }
            });
            $(document).delegate('td.series', 'click', loadSeries);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function load() {
    return _ref2.apply(this, arguments);
  };
}();

window.onload = load();
