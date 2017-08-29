function createDb(relation) {
    var http = require('http');
    var client = http.createClient(5984, "127.0.0.1");
    var request = client.request("PUT", "/" + relation);
    request.on("response", function (response) {
        response.on("end", function () {
            if (response.statusCode == 201) {
                console.log("DB created");
            } else {
                console.log("DB failed to create");
            }
        });
    });
    request.end();
    var couchdb = require('felix-couchdb');
    var dbClient = couchdb.createClient(5984, "127.0.0.1");
    var db = dbClient.db(relation);

    return db;
}

var db1 = createDb('auftraege');
var db2 = createDb('fahrer');
var db3 = createDb('manager');
var db4 = createDb('adressen');

callback = function (err, doc) {
    if (err) {
        console.log(JSON.stringify(err));
    } else {
        console.log('Saved doc');
    }
}
    
var auftrag1 = {
    "auftragsNr": 1,
    "zeitstempel": "2017-08-23T13:07:00",
    "bearbeitungsStatus": 0,
    "startadresse": 1,
    "zieladresse": 2
};

db1.saveDoc('e03afe3023345fcfe2cf10ada2000b33', auftrag1, callback);

var auftrag2 = {
    "auftragsNr": 2,
    "zeitstempel": "2017-08-23T13:43:00",
    "bearbeitungsStatus": 0,
    "startadresse": 3,
    "zieladresse": 2
};

db1.saveDoc('e03afe3023345fcfe2cf10ada2009808', auftrag2, callback);

var auftrag3 = {
    "auftragsNr": 3,
    "zeitstempel": "2017-08-23T13:45:00",
    "bearbeitungsStatus": 0,
    "startadresse": 1,
    "zieladresse": 3
};

db1.saveDoc('e03afe3023345fcfe2cf10ada200acda', auftrag3, callback);

var auftrag4 = {
    "auftragsNr": 4,
    "zeitstempel": "2017-08-23T13:45:50",
    "bearbeitungsStatus": 0,
    "startadresse": 3,
    "zieladresse": 1
};

db1.saveDoc('e03afe3023345fcfe2cf10ada200c935', auftrag4, callback);

var auftrag5 = {
    "auftragsNr": 5,
    "zeitstempel": "2017-08-23T13:47:00",
    "bearbeitungsStatus": 1,
    "startadresse": 2,
    "zieladresse": 4
};

db1.saveDoc('e03afe3023345fcfe2cf10ada200f984', auftrag5, callback);

var fahrer1 = {
    "pers-nr": 1,
    "vorname": "John",
    "nachname": "Smith",
    "passwort": "john-smith",
    "standort": 2,
    "auftrag": 0
};

db2.saveDoc('e03afe3023345fcfe2cf10ada2003b1a', fahrer1, callback);

var fahrer2 = {
    "pers-nr": 2,
    "vorname": "Thomas",
    "nachname": "Meier",
    "passwort": "thomas-meier",
    "standort": 1,
    "auftrag": 0
};

db2.saveDoc('e03afe3023345fcfe2cf10ada2014e92', fahrer2, callback);

var fahrer3 = {
    "pers-nr": 3,
    "vorname": "Johannes",
    "nachname": "Bond",
    "passwort": "johannes-bond",
    "standort": 4,
    "auftrag": 0
};

db2.saveDoc('e03afe3023345fcfe2cf10ada2017423', fahrer3, callback);

var manager1 = {
    "pers-nr": 1,
    "vorname": "Hans",
    "nachname": "Müller",
    "passwort": "hans-mueller"
};

db3.saveDoc('e03afe3023345fcfe2cf10ada200824e', manager1, callback);

var adresse1 = {
    "adressen-nr": 1,
    "avenue": 5,
    "street": 31
};

db4.saveDoc('e03afe3023345fcfe2cf10ada20050e4', adresse1, callback);

var adresse2 = {
    "adressen-nr": 2,
    "avenue": 2,
    "street": 53
};

db4.saveDoc('e03afe3023345fcfe2cf10ada20065dc', adresse2, callback);

var adresse3 = {
    "adressen-nr": 3,
    "avenue": 3,
    "street": 44
};

db4.saveDoc('e03afe3023345fcfe2cf10ada2011533', adresse3, callback);

var adresse4 = {
    "adressen-nr": 4,
    "avenue": 1,
    "street": 9
};

db4.saveDoc('e03afe3023345fcfe2cf10ada201362d', adresse4, callback);
