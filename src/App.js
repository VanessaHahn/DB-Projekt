var $ = $ || {};
var App = App || {};
App = (function () {
  "use strict";

  var that = {},
    employee,
    express,
    bodyparser,
    db;

  function initLayout() {

  }

  function viewLogin(employeeStatus) {
    document.querySelector(".main").classList.add("hidden");
    document.querySelector(".login").classList.remove("hidden");
    employee = employeeStatus;
  }

  function login() {
    var persNr = document.querySelector(".inputName").value;
    var password = document.querySelector(".inputKey").value;

    if (employee === 'fahrer') {
      httpGetAsync("http://localhost:8000/drivers"), function (callback) {
        console.log(callback);
      };
     }
    viewTasks();
  }

  function viewTasks() {
    document.querySelector(".login").classList.add("hidden");
    document.querySelector("." + employee).classList.remove("hidden");
  }

  function httpGetAsync(theUrl, callback)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  that.initLayout = initLayout;
  that.viewLogin = viewLogin;
  that.login = login;
  return that;
}());
