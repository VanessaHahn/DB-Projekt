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
                viewTasks(driver);
            }
        } else {
            let manager = filterManager(parseInt(persNr));
            if (manager.passwort === password) {
                viewTasks();
            }
        }
    }

    function terminated() {
        var currentAssignment;
        console.log("checkbox");
        var currentID = document.querySelector("#Auftragsnummer").innerHTML;
        console.log(currentID);
        for (let i = 0; i < assignments.length; i++) {
            if (parseInt(currentID) === assignments[i]._id) {
                currentAssignment = assignments[i];
            }
        }
        updateState(currentAssignment);
    }

    function updateState(currentAssignment) {
        var request = new XMLHttpRequest();
        request.open("PUT", "http://localhost:8000/assignments/_id?id=" + currentAssignment._id + "&state=" + (currentAssignment.state + 1), true);
        request.send(null);
        if (currentAssignment.state === 2) {
            var driver;
            for (let i = 0; i < drivers.length; i++) {
                if (drivers[i].assignmentID === currentAssignment._id) {
                    driver = drivers[i];
                }
            }
            viewAssignment(driver);
        }
    }

    function filterDriver(driverID) {
        let filteredDriver;
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i]._id === driverID) {
                filteredDriver = drivers[i];
            }
        }
        return filteredDriver;
    }

    function filterManager(driverID) {
        let filteredDriver;
        for (let i = 0; i < managers.length; i++) {
            if (managers[i]._id === driverID) {
                filteredDriver = managers[i];
            }
        }
        return filteredDriver;
    }

    function filterAssignement(assignmentID) {
        let filteredAssign;
        for (let i = 0; i < drivers.length; i++) {
            if (assignments[i]._id === assignmentID) {
                filteredAssign = assignments[i];
            }
        }
        return filteredAssign;
    }

    function viewTasks(driver = null) {
        document.querySelector(".login").classList.add("hidden");
        document.querySelector("." + employee).classList.remove("hidden");
        if (employee === 'fahrer') {
            viewAssignment(driver);
        }
    }

    function viewAssignment(driver) {
        var assignment = null;
        for (let i = 0; i < assignments.length; i++) {
            if (driver.assignmentID === assignments[i]._id) {
                assignment = assignments[i];
            }
        }
        if (assignment === null) {
            assignment = selectNextAssignment(driver);
            updateAssignmentID(driver, assignment._id);
            updateState(assignment);
        }
        console.log(assignment);
        var startAdress,
            targetAdress;
        for (let i = 0; i < adresses.length; i++) {
            if (adresses[i]._id == assignment.startAdressID) {
                startAdress = adresses[i];
            }
            if (adresses[i]._id == assignment.endAdressID) {
                targetAdress = adresses[i];
            }
        }
        document.querySelector("#Datum").innerHTML = assignment.date;
        document.querySelector("#Startadresse").innerHTML = startAdress.avenue + ". Avenue" + "/" + startAdress.street + ". Street";
        document.querySelector("#Zieladresse").innerHTML = targetAdress.avenue + ". Avenue" + "/" + targetAdress.street + ". Street";
        document.querySelector("#Status").innerHTML = assignment.state;
    }

    function updateAssignmentID(driver, assignmentID) {
        var url = "http://localhost:8000/drivers";
        var json = JSON.stringify({
            assignmentID: assignmentID
        });

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url + '/_id?_id=' + driver._id, true);
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

    function insertAssignment() {
        var url = "http://localhost:8000/assignments";

        var data = {};
        data._id = assignments.length + 1;
        data.date = Date.now();
        data.state = 0;
        data.startAdressID = 1;
        data.endAdressID = 1;
        var json = JSON.stringify(data);
        console.log(json);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url + '/add', true);
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

    function insertDriver() {
        var vorname = document.querySelector(".inputFirstName").value;
        var nachname = document.querySelector(".inputLastName").value;
        //var standort = document.querySelector(".inputNumber").value;
        var driverName = vorname + " " + nachname;
        var url = "http://localhost:8000/drivers";

        var data = {};
        data._id = drivers.length + 1;
        data.name = driverName;
        data.passwort = vorname.lowercase + "-" + nachname.lowercase;
        data.adressID = 1;
        data.assignmentID = 0;
        var json = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url + '/add', true);
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

    function updateDriver() {
        var url = "http://localhost:8000/drivers";
        var persNr = document.querySelector(".inputNumber").value;
        var vorname = document.getElementById("updateInputFirstName").value;
        var nachname = document.getElementById("updateInputLastName").value;
        var driverName = vorname + " " + nachname;
        var checkID = filterDriver(parseInt(persNr));
        if (checkID != null) {
            var request = new XMLHttpRequest();
            request.open("PUT", "http://localhost:8000/drivers/_id?_id=" + persNr + "&name=" + driverName, true);
            request.send(null);
        }
    }

    function selectNextAssignment(driver) {
        var minDistance = 1000000;
        var minAssignment;

        for (let i = 0; i < assignments.length; i++) {
            var distance = getDistance(driver.adressID, assignments[i].startAdressID);
            if (distance < minDistance && assignments[i].state === 0) {
                minDistance = distance;
                minAssignment = assignments[i];
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
    that.terminated = terminated;
    that.updateDriver = updateDriver;
    that.insertDriver = insertDriver;
    that.insertAssignment = insertAssignment;
    return that;
}());
