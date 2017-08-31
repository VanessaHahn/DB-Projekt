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

    express = require("express");
    bodyparser = require("body-parser");
    initDatabase();
  }

  function initDatabase() {
    db = require("./DatabaseConnector");
    db.init();
    db.connect().then(function () {
      console.log("Connections success");
    }).catch(function (err) {
      console.log("Error" + err);
    });
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
      let driver = db.getDriverByID(persNr);
      console.log(driver);
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
