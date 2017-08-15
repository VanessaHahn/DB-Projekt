//This modul is the internal representation of the data. Should be updated from the database
App.Model = function () {
  "use strict";
  var that = {},
      adresses,
      drivers,
      assignments;

  function getAdresses() {
    return adresses;
  }

  function setAdresses(databaseAdresses) {
    adresses = databaseAdresses;
  }

  function getDrivers() {
    return drivers;
  }

  function setDrivers(databaseDrivers) {
    drivers = databaseDrivers;
  }

  function getAssignments() {
    return assignments;
  }

  function setAssignements(databaseAssignments) {
    assignments = databaseAssignments;
  }

  function addAdress(adressID, adressLineOne, adressLineTwo) {
    let adress = {
      id: adressID, lineOne: adressLineOne, lineTwo: adressLineTwo,
    };
    adresses.push(adress);
  }

  function addDriver(persID, prename, surname, locationID) {
    let driver = {
      id: persID, name: prename + surname, adress: locationID,
    };
    drivers.push(driver);
  }

  function filterDrivers(driverID) {
    let filteredDriver;
    for(let i = 0; i < drivers.length; i++){
      if(drivers[i].id === driverID){
        filteredDriver = assignments[i];
      }
    }
    return filteredDriver;
  }
  //If a manager wants to update a driver
  function updateDriver(driverID, prename, surname, locationID) {
    let driver = filterDrivers(driverID);
    driver.name = prename + surname;
    driver.adress = locationID;
  }

  function addAssignment(assignID, assignDate, assignState, startLocationID, endLocationID) {
    let assignment = {
      id: assignID,
      date: assignDate,
      state: assignState,
      startAdress: startLocationID,
      endAdress: endLocationID,
    };
    assignments.push(assignment);
  }

  function filterAssignment(assignID) {
    let filteredAssignment;
    for(let i = 0; i < assignments.length; i++){
      if(assignments[i].id === assignID){
        filteredAssignment = assignments[i];
      }
    }
    return filteredAssignment;
  }

  function markAssignnment(assignID) {
    let assignment = filterAssignment(assignID);
    assignment.state = true;
    return assignment.endAdress; //Return the adress of the assignment here to update the location of the driver next in the main app
  }
  //Should be called, when a driver updates his location e.g he completes his assignment
  function updateDriverLocation(driverID, locationID) {
    let driver = filterDrivers(driverID);
    driver.adress = locationID;
  }

  function getNextAssignment(driverID) {
    let driver = filterDrivers(driverID),
    currentLocation = driver.adress;
    //ToDo Add shortest way algorithm here -> get all assignment locations and check which one is nearest
    //driver.assignment = nearestAssignment;
  }

  that.getDrivers = getDrivers;
  that.getAssignments = getAssignments;
  that.getAdresses = getAdresses;
  that.setDrivers = setDrivers;
  that.setAssignment = setAssignements;
  that.setAdresses = setAdresses;
  that.addDriver = addDriver;
  that.addAssignement = addAssignment;
  that.addAdress = addAdress;
  that.updateDriver = updateDriver;
  that.updateDriverLocation = updateDriverLocation;
  that.markAssignment = markAssignnment;
  //that.getNextAssignment = getNextAssignment;
} ;