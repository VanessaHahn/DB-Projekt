var express = require('express');
var bodyParser = require('body-parser');
var db = require('./DatabaseConnector');

var app = express();
app.use(bodyParser.json());
//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/drivers', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  let drivers = db.getAllDrivers().then(function (allDrivers) {
    res.json(allDrivers);
  }).catch(function (err) {
    res.sendStatus(500);
  });
  });

app.get('/managers', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  let managers = db.getAllMangers().then(function (allManagers) {
    res.json(allManagers);
  }).catch(function (err) {
    res.sendStatus(500);
  });
});

app.get('/adresses', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  let adresses = db.getAllAdresses().then(function (allAdresses) {
    res.json(allAdresses);
  }).catch(function (err) {
    res.sendStatus(500);
  });
});

app.get('/assignments', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  let assignments = db.getAllAssignments().then(function (allAssignments) {
    res.json(allAssignments);
  }).catch(function (err) {
    res.sendStatus(500);
  });
});


//Call this with /drivers/_id?_id=ID
app.get('/drivers/_id', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var driver = db.getDriverByID(req.query._id).then(function (driver) {
    if (driver === null) { //Falls kein Fahrer mit passender ID gefunden wird, wird 404 zurückgegeben
      res.sendStatus(404);
    } else {
      res.json(driver);
    }
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});


app.get('/managers/_id', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var manager = db.getManagerByID(req.query._id).then(function (manager) {
    if (manager === null) { //Falls kein Manager mit passender ID gefunden wird, wird 404 zurückgegeben
      res.sendStatus(404);
    } else {
      res.json(manager);
    }
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.get('/assignments/_id', function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var assignment = db.getAssignmentByID(req.query._id).then(function (manager) {
    if (manager === null) { //Falls kein Manager mit passender ID gefunden wird, wird 404 zurückgegeben
      res.sendStatus(404);
    } else {
      res.json(manager);
    }
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.put("/assignments/_id", function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var assignment = db.markAssignment(req.query._id, req.query.state).then(function (assignment) {
    if (assignment === null) {
      res.sendStatus(404);
    } else {
      res.json(assignment);
    }
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.put("/drivers/_id", function (req,res, next) {
  console.log("Connected: " + db.isConnected());
  let driverID = req.query._id;
  let updatedDriverName = req.query.name;
  db.updateDriver(driverID,updatedDriverName).then(function (drivers) {
    res.json(drivers);
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

//Send a Json (as body) to add a new driver
app.post("/drivers/add", function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var driver = req.body;
  db.addDriver(driver).then(function (drivers) {
    res.json(drivers);
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.post("/managers/add", function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var manager = req.body;
  db.addManager(manager).then(function (managers) {
    res.json(managers);
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.post("/adresses/add", function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var adress = req.body;
  db.addAdress(adress).then(function (addresses) {
    res.json(addresses);
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  });
});

app.post("/assignments/add", function (req, res, next) {
  console.log("Connected: " + db.isConnected());
  var assignment = req.body;
  db.addAssignment(assignment).then(function (assignments) {
    res.json(assignments);
  }).catch(function (err) {
    console.log("There was an error!");
    res.sendStatus(500);
  })
});

db.init();
db.connect().then(function () {
  console.log("Connection success!");
}).catch(function (err) {
  console.log("There was an error!");
  console.log(err);
});

app.listen(8000);
console.log('Running on port 8000');
