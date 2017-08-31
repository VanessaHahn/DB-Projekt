var nano = require('nano')('http://localhost:32770');

nano.db.create('auftraege', function () {
  var auftraege = nano.use('auftraege');

  var auftrag1 = {
    "auftragsNr": 1,
    "zeitstempel": "2017-08-23T13:07:00",
    "bearbeitungsStatus": 0,
    "startadresse": 1,
    "zieladresse": 2
  };

  var auftrag2 = {
    "auftragsNr": 2,
    "zeitstempel": "2017-08-23T13:43:00",
    "bearbeitungsStatus": 0,
    "startadresse": 3,
    "zieladresse": 2
  };

  var auftrag3 = {
    "auftragsNr": 3,
    "zeitstempel": "2017-08-23T13:45:00",
    "bearbeitungsStatus": 0,
    "startadresse": 1,
    "zieladresse": 3
  };

  var auftrag4 = {
    "auftragsNr": 4,
    "zeitstempel": "2017-08-23T13:45:50",
    "bearbeitungsStatus": 0,
    "startadresse": 3,
    "zieladresse": 1
  };

  var auftrag5 = {
    "auftragsNr": 5,
    "zeitstempel": "2017-08-23T13:47:00",
    "bearbeitungsStatus": 1,
    "startadresse": 2,
    "zieladresse": 4
  };

  auftraege.insert(auftrag1, "000");
  auftraege.insert(auftrag2, "001");
  auftraege.insert(auftrag3, "002");
  auftraege.insert(auftrag4, "003");
  auftraege.insert(auftrag5, "004");
});

nano.db.create('adressen', function () {
  var adressen = nano.use('adressen');

  var adresse1 = {
    "adressen-nr": 1,
    "avenue": 5,
    "street": 31
  };

  var adresse2 = {
    "adressen-nr": 2,
    "avenue": 2,
    "street": 53
  };

  var adresse3 = {
    "adressen-nr": 3,
    "avenue": 3,
    "street": 44
  };

  var adresse4 = {
    "adressen-nr": 4,
    "avenue": 1,
    "street": 9
  };

  adressen.insert(adresse1, "000");
  adressen.insert(adresse2, "001");
  adressen.insert(adresse3, "002");
  adressen.insert(adresse4, "003");
});

nano.db.create('fahrer', function () {
  var fahrer = nano.use('fahrer');

  var fahrer1 = {
    "pers-nr": 1,
    "vorname": "John",
    "nachname": "Smith",
    "passwort": "john-smith",
    "standort": 2,
    "auftrag": 0
  };

  var fahrer2 = {
    "pers-nr": 2,
    "vorname": "Thomas",
    "nachname": "Meier",
    "passwort": "thomas-meier",
    "standort": 1,
    "auftrag": 0
  };

  var fahrer3 = {
    "pers-nr": 3,
    "vorname": "Johannes",
    "nachname": "Bond",
    "passwort": "johannes-bond",
    "standort": 4,
    "auftrag": 0
  };

  fahrer.insert(fahrer1, "000");
  fahrer.insert(fahrer2, "001");
  fahrer.insert(fahrer3, "002");
});

nano.db.create('manager', function () {
  var manager = nano.use('manager');

  var manager1 = {
    "pers-nr": 1,
    "vorname": "Hans",
    "nachname": "Müller",
    "passwort": "hans-mueller"
  };

  manager.insert(manager1, "000");
});

getAllDrivers();

function getAllDrivers() {
  var drivers = nano.use("fahrer");
  drivers.multipart.get("fahrer",function (err, body) {
      console.log(body);
    })
  }