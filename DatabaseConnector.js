var mongoose = require("mongoose"),
  drivers,
  adresses,
  managers,
  assignments;

module.exports = (function () {
  var that = {},
    db = mongoose.connection,
    url,
    connected = false;

  init();
  connect();

  function init() {
    url = "mongodb://" + "localhost" + ":" + "32773" + "/" + "dbProject"; //URL auf der Mongo läuft (Port austauschen)

    // Schemata werden in etwa wie ein Schema bei einer relationalen Datenbank verwendet
    var driverSchema = mongoose.Schema({
      id: {type: Number, required: true,},
      name: {type: String, required: true,},
      passwort: {type: String, required: true,},
      adressID: {type: Number,},
    });

    var adressesSchema = mongoose.Schema({
      id: {type: Number, required: true,},
      lineOne: {type: String, required: true,},
      lineTwo: {type: String, required: true,},
    });

    var managerSchema = mongoose.Schema({
      id: {type: Number, required: true,},
      name: {type: String, required: true,},
      passwort: {type: String, required: true,},
    });

    var assignmentSchema = mongoose.Schema({
      id: {type: Number, required: true,},
      date: {type: Date, required: true,},
      state: {type: Number, required: true},
      startAdressID: {type: Number, required: true},
      endAdressID: {type: Number, required: true},
    });

    drivers = mongoose.model("drivers", driverSchema);
    adresses = mongoose.model("adresses", adressesSchema);
    managers = mongoose.model("managers", managerSchema);
    assignments = mongoose.model("assignments", assignmentSchema);
  }

  function connect() {
    return new Promise(function (resolve, reject) {
      mongoose.connect(url);
      db.on("error", function (err) {
        reject();
      });

      db.on("disconnect", function () {
        connected = false;
      });

      db.once("open", function () {
        connected = true;
        resolve();
      });
    });
  }

  function getAllDrivers() {
    return new Promise(function (resolve, reject) {
      drivers.find({}, function (err, driver) {
        if (err) {
          reject(err);
        } else {
          resolve(driver);
          console.log(driver);
        }
      });
    });
  }

  function getAllManagers() {
    return new Promise(function (resolve, reject) {
      managers.find({}, function (err, manager) {
        if (err) {
          reject(err);
        } else {
          resolve(manager);
          console.log(manager);
        }
      });
    });
  }

  function getAllAssignments() {
    return new Promise(function (resolve, reject) {
      assignments.find({}, function (err, assignment) {
        if (err) {
          reject(err);
        } else {
          resolve(assignment);
          console.log(assignment);
        }
      });
    });
  }

  function getAllAdresses() {
    return new Promise(function (resolve, reject) {
      adresses.find({}, function (err, adresses) {
        if (err) {
          reject(err);
        } else {
          resolve(adresses);
          console.log(adresses);
        }
      });
    });
  }

  function addDriver(driver) {
    return new Promise(function (resolve, reject) {
      drivers.create(driver, function (err, newDriver) {
        if (err) {
          reject(err);
        } else {
          resolve(newDriver);
        }
      });
    });
  }

  function addManager(manager) {
    return new Promise(function (resolve, reject) {
      managers.create(manager, function (err, newManager) {
        if (err) {
          reject(err);
        } else {
          resolve(newManager);
        }
      });
    });
  }

  function addAssignement(assignement) {
    return new Promise(function (resolve, reject) {
      assignments.create(assignement, function (err, newAssignment) {
        if (err) {
          reject(err);
        } else {
          resolve(newAssignment);
        }
      });
    });
  }

  function addAddress(adress) {
    return new Promise(function (resolve, reject) {
      adresses.create(adress, function (err, newAddress) {
        if (err) {
          reject(err);
        } else {
          resolve(newAddress);
        }
      });
    });
  }

  function isConnected() {
    return connected;
  }

  that.init = init;
  that.connect = connect;
  that.getAllDrivers = getAllDrivers;
  that.getAllMangers = getAllManagers;
  that.getAllAssignments = getAllAssignments;
  that.getAllAdresses = getAllAdresses;
  that.addDriver = addDriver;
  that.addAdress = addAddress;
  that.addManager = addManager;
  that.addAssignment = addAssignement;
  that.isConnected = isConnected;
  return that;
})();