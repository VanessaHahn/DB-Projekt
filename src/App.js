var $ = $ || {};
var App = App || {};
App = (function () {
    "use strict";

    var that = {},
        employee,
        drivers,
        managers,
        adresses,
        assignments;

    function initLayout() {
        getDrivers();
        getManagers();
        getAdresses();
        getAssignments();
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
            let driver = filterDriver(parseInt(persNr));
            if (driver.passwort === password) {
                viewTasks();
            }
        } else {
            let manager = filterManager(parseInt(persNr));
            if (manager.passwort === password) {
                viewTasks();
            }
        }
    }

    function filterDriver(driverID) {
        let filteredDriver;
        for (let i = 0; i < drivers.length; i++) {
            console.log(drivers[i]._id === driverID);
            if (drivers[i]._id === driverID) {
                filteredDriver = drivers[i];
            }
        }
        return filteredDriver;
    }

    function filterManager(driverID) {
        let filteredDriver;
        for (let i = 0; i < managers.length; i++) {
            console.log(drivers[i]._id === driverID);
            if (managers[i]._id === driverID) {
                filteredDriver = managers[i];
            }
        }
        return filteredDriver;
    }

    function viewTasks() {
        document.querySelector(".login").classList.add("hidden");
        document.querySelector("." + employee).classList.remove("hidden");
    }

    function getDrivers() {
        var driver = httpGetAsync("http://localhost:8000/drivers", function (callback) {
            let driversJson = callback;
            drivers = JSON.parse(driversJson);
        });
    }

    function getManagers() {
        var manager = httpGetAsync("http://localhost:8000/managers", function (callback) {
            let managersJson = callback;
            managers = JSON.parse(managersJson);
        });
    }

    function getAdresses() {
        var adress = httpGetAsync("http://localhost:8000/adresses", function (callback) {
            let adressesJson = callback;
            adresses = JSON.parse(adressesJson);
        });
    }

    function getAssignments() {
        var assignment = httpGetAsync("http://localhost:8000/assignments", function (callback) {
            let assignmentsJson = callback;
            assignments = JSON.parse(assignmentsJson);
        });
    }

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    function insertDriver() {
        var vorname = document.querySelector(".inputFirstName").value;
        var nachname = document.querySelector(".inputLastName").value;
        //var standort = document.querySelector(".inputName").value;
        var driverName = vorname + " " + nachname;
        var url = "http://localhost:8000/drivers";

        var data = {};
        data.name = driverName;
        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "201") {
                console.table(users);
            } else {
                console.error(users);
            }
        }
        xhr.send(json);
    }

    function updateDrivers() {
        var url = "http://localhost:8000/drivers";
        var persNr = document.querySelector(".inputName").value;
        var vorname = document.querySelector(".inputFirstName").value;
        var nachname = document.querySelector(".inputLastName").value;
        var driverName = vorname + " " + nachname;
        var checkID = filterDriver(persNr);
        if (checkID != null) {
            var data = {};
            data.name = driverName;
            var json = JSON.stringify(data);

            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url + '/' + persNr, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(users);
                } else {
                    console.error(users);
                }
            }
            xhr.send(json);
        }
    }

    function selectNextAssignment() {
        var minDistance = 1000000;
        var minAssignment;

        for (let i = 0; i < assignments.length; i++) {
            for (let j = 0; j < addresses.length; j++) {
                var distance = getDistance(drivers[j].adressID, assignments[i].startAdressID);
                if (distance < minDistance) {
                    minDistance = distance;
                    minAssignment = assignments[i];
                }
            }
        }
        return minAssignment;
    }

    function getDistance(start, target) {
        var startAdress,
            targetAdress;
        for (let i = 0; i < adresses.length; i++) {
            if (adresses[i]._id == start) {
                startAdress = adresses[i];
            }
            if (adresses[i]._id == target) {
                targetAdress = adresses[i];
            }
        }
        var distance = targetAdress.avenue - startAdress.avenue + targetAdress.street - startAdress.street;
        return distance;
    }

    that.initLayout = initLayout;
    that.viewLogin = viewLogin;
    that.login = login;
    that.updateDrivers = updateDrivers;
    that.insertDriver = insertDriver;
    return that;
}());
