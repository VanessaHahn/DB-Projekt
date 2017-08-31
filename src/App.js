var $ = $ || {};
var App = App || {};
App = (function () {
  "use strict";

  var that = {},
    employee;

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
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "//localhost:8000/drivers", false);
      xhr.send(null);
      console.log(xhr.responseText);
    }
    viewTasks();
  }

  function viewTasks() {
    document.querySelector(".login").classList.add("hidden");
    document.querySelector("." + employee).classList.remove("hidden");
  }

  that.initLayout = initLayout;
  that.viewLogin = viewLogin;
  that.login = login;
  return that;
}());
