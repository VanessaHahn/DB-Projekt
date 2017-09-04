var mongoose = require("mongoose"),
    autoIncrement = require("mongoose-auto-increment"),
    drivers,
    driverSchema,
    adresses,
    adressesSchema,
    managers,
    managerSchema,
    assignments,
    assignmentSchema;

module.exports = (function () {
    var that = {},
        db = mongoose.connection,
        url,
        connected = false;

    function init() {
        url = "mongodb://" + "localhost" + ":" + "27017" + "/" + "dbProject"; //URL auf der Mongo läuft (Port austauschen)

        // Schemata werden in etwa wie ein Schema bei einer relationalen Datenbank verwendet
        driverSchema = mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            passwort: {
                type: String,
                required: true,
            },
            adressID: {
                type: Number,
            },
            assignmentID: {
                type: Number,
            },
        });

        adressesSchema = mongoose.Schema({
            avenue: {
                type: Number,
                required: true,
            },
            street: {
                type: Number,
                required: true,
            },
        });

        managerSchema = mongoose.Schema({
            name: {
                type: String,
            },
            passwort: {
                type: String,
                required: true,
            },
        });

        assignmentSchema = mongoose.Schema({
            date: {
                type: Date,
            },
            state: {
                type: Number,
                required: true,
            },
            startAdressID: {
                type: Number,
                required: true,
            },
            endAdressID: {
                type: Number,
                required: true,
            },
        });
    }

    function addDefaultValuesIntoDatabase(connection) {
        driverSchema.plugin(autoIncrement.plugin, "drivers");
        adressesSchema.plugin(autoIncrement.plugin, "adresses");
        managerSchema.plugin(autoIncrement.plugin, "managers");
        assignmentSchema.plugin(autoIncrement.plugin, "assignments");

        drivers = connection.model("drivers", driverSchema);
        adresses = connection.model("adresses", adressesSchema);
        managers = connection.model("managers", managerSchema);
        assignments = connection.model("assignments", assignmentSchema);

        addDriver({
            "name": "John Smith",
            "passwort": "john-smith",
            "adressID": 2,
            "assignmentID": 0,
        });
        addDriver({
            "name": "Thomas Meier",
            "passwort": "thomas-meier",
            "adressID": 1,
            "assignmentID": 1,
        });
        addDriver({
            "name": "Johannes Bond",
            "passwort": "johannes-bond",
            "adressID": 4,
            "assignmentID": 0,
        });
        addAdress({
            "avenue": 5,
            "street": 31
        });
        addAdress({
            "avenue": 2,
            "street": 53,
        });
        addAdress({
            "avenue": 3,
            "street": 44
        });
        addAdress({
            "avenue": 1,
            "street": 9,
        });
        addManager({
            "name": "Hans Mueller",
            "passwort": "hans-mueller",
        });
        addAssignment({
            "date": "2017-08-23T13:07:00",
            "state": 0,
            "startAdressID": 1,
            "endAdressID": 2,
        });
        addAssignment({
            "date": "2017-08-23T13:43:00",
            "state": 0,
            "startAdressID": 3,
            "endAdressID": 2,
        });
        addAssignment({

            "date": "2017-08-23T13:45:00",
            "state": 0,
            "startAdressID": 1,
            "endAdressID": 3,
        });
        addAssignment({
            "date": "2017-08-23T13:45:50",
            "state": 0,
            "startAdressID": 3,
            "endAdressID": 1,
        });
        addAssignment({
            "date": "2017-08-23T13:47:00",
            "state": 0,
            "startAdressID": 2,
            "endAdressID": 4,
        });
    }

    function connect() {
        return new Promise(function (resolve, reject) {
            var connection = mongoose.connect(url);
            autoIncrement.initialize(connection);
            db.on("error", function (err) {
                reject();
            });

            db.on("disconnect", function () {
                connected = false;
            });

            db.once("open", function () {
                connected = true;
                addDefaultValuesIntoDatabase(connection);
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

    function updateDriver(driverID, driverUpdate) {
        return new Promise(function (resolve, reject) {
            drivers.findByIdAndUpdate(driverID, driverUpdate, function (err, driverUpdate) {
                if (err) {
                    reject(err);
                } else {
                    resolve(driverUpdate);
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

    function getManagerByID(managerID) {
        return new Promise(function (resolve, reject) {
            managers.findById(managerID, function (err, manager) {
                if (err) {
                    reject(err);
                } else {
                    resolve(manager);
                }
            });
        });
    }

    function getDriverByID(driverID) {
        return new Promise(function (resolve, reject) {
            drivers.findById(driverID, function (err, driver) {
                if (err) {
                    reject(err);
                } else {
                    resolve(driver);
                }
            });
        });
    }

    function getAssignmentByID(assignmentID) {
        return new Promise(function (resolve, reject) {
            assignments.findById(assignmentID, function (err, driver) {
                if (err) {
                    reject(err);
                } else {
                    resolve(driver);
                }
            });
        });
    }

    function addAssignment(assignement) {
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

    function markAssignment(assignmentID, assignmentState) {
        console.log(assignmentID);
        return new Promise(function (resolve, reject) {
            assignments.findById(assignmentID, function (err, driverUpdate) {
                if (err || driverUpdate === null) {
                    reject(err);
                } else {
                    driverUpdate.state = assignmentState;
                    driverUpdate.save();
                    resolve(driverUpdate);
                }
            });
        });
    }

    function addAdress(adress) {
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
    that.getDriverByID = getDriverByID;
    that.getManagerByID = getManagerByID;
    that.getAssignmentByID = getAssignmentByID;
    that.addDriver = addDriver;
    that.addAdress = addAdress;
    that.addManager = addManager;
    that.addAssignment = addAssignment;
    that.markAssignment = markAssignment;
    that.updateDriver = updateDriver;
    that.isConnected = isConnected;
    return that;
})();
