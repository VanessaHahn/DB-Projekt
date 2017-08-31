var $ = $ || {};
var App = App || {};
App = (function () {
  "use strict";

  var that = {},
    employee,
    express,
    nano;

  function initLayout() {
    nano = require('nano')('http://localhost:5984');
    express = require("express");
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
      var fahrer = nano.use("fahrer");
      var documents = fahrer.list();
      console.log(documents);
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
