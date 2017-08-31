var $ = $ || {};
var App = App || {};
App = (function () {
  "use strict";

  var that = {},
    employee,
    drivers,
    managers,
    adresses,
    assignments,
    currentAssignment;

  function initLayout(){
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
      if(driver.passwort === password){
        currentAssignment = filterAssignement(driver.assignmentID);
        console.log(currentAssignment);
        if(currentAssignment !== undefined) {
          document.getElementById("Auftragsnummer").innerHTML = currentAssignment._id;
          document.getElementById("Datum").innerHTML = currentAssignment.date;
          document.getElementById("Startadresse").innerHTML = currentAssignment.startAdressID;
          document.getElementById("Zieladresse").innerHTML = currentAssignment.endAdressID;
          document.getElementById("Status").innerHTML = currentAssignment.state;
        }
        viewTasks();
        checkBox();
      }
    }else {
      let manager = filterManager(parseInt(persNr));
      if(manager.passwort === password){
        viewTasks();
      }
    }
  }

  function checkBox() {
    var checkbox = document.querySelector("input[name=Status]");

    checkbox.addEventListener( 'change', function() {
      if(this.checked) {
        var request = new XMLHttpRequest();
        request.send(null);
      }
    });
  }

  function filterDriver(driverID) {
    let filteredDriver;
    for(let i = 0; i < drivers.length; i++){
      if(drivers[i]._id === driverID){
        filteredDriver = drivers[i];
      }
    }
    return filteredDriver;
  }

  function filterManager(driverID) {
    let filteredDriver;
    for(let i = 0; i < managers.length; i++){
      if(managers[i]._id === driverID){
        filteredDriver = managers[i];
      }
    }
    return filteredDriver;
  }

  function filterAssignement(assignmentID) {
    let filteredAssign;
    for(let i = 0; i < drivers.length; i++){
      if(assignments[i]._id === assignmentID){
        filteredAssign = assignments[i];
      }
    }
    return filteredAssign;
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
