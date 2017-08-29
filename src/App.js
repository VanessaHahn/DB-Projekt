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
        //DB abfrage in manager bzw fahrer
        //wenn erfolgreich:
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
