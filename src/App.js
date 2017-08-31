var $ = $ || {};
var App = App || {};
App = (function () {
    "use strict";

    var that = {},
        employee,
        drivers;

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
            getDrivers();
        }
        viewTasks();
    }

    function viewTasks() {
        document.querySelector(".login").classList.add("hidden");
        document.querySelector("." + employee).classList.remove("hidden");
    }

    function getDrivers() {
        var drivers = httpGetAsync("http://localhost:8000/drivers", function (callback) {
            let driversJson = callback;
            drivers = JSON.parse(driversJson);
            console.log(drivers);
        });
        return drivers;
    }

    function getAssignments() {
        var assignments = httpGetAsync("http://localhost:8000/assignments", function (callback) {
            let assignmentsJson = callback;
            drivers = JSON.parse(assignmentsJson);
            console.log(assignments);
        });
        return assignments;
    }

    function getAddresses() {
        var addresses = httpGetAsync("http://localhost:8000/adresses", function (callback) {
            let addressesJson = callback;
            drivers = JSON.parse(addressesJson);
            console.log(addresses);
        });
        return addresses;
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

    function selectNextAssignment() {
        var minDistance = 1000000;
        var minAssignment;
        var assignments = getAssignments();

        var drivers = getDrivers();
        for (let i = 0; i < assignments.length; i++) {
            for (let j = 0; j < addresses.length; j++) {
                var distance = getDistance(drivers[j].adressID, assignments[i].startAdressID);
                if (distance < minDistance) {
                    minDistance = distance;
                    minAssignment = assignments[i];
                }
            }
        }
    }

    function getDistance(start, target) {
        var addresses = getAddresses();
        var startAddress,
            targetAddress;
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i]._id === start) {
                startAddress = addresses[i];
            }
            if (addresses[i]._id === target) {
                targetAddress = addresses[i];
            }
        }
        var distance = targetAddress.avenue - startAddress.avenue + targetAddress.street - startAddress.street;
        return distance;
    }

    that.initLayout = initLayout;
    that.viewLogin = viewLogin;
    that.login = login;
    return that;
}());
