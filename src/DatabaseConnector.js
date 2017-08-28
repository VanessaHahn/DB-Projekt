var http = require('http');

request = function (request) {
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
}
var client = http.createClient(5984, "127.0.0.1");
var request1 = client.request("PUT", "/auftraege");
request(request1);
var request2 = client.request("PUT", "/adressen");
request(request2);

var couchdb = require('felix-couchdb');
var dbClient = couchdb.createClient(5984, "127.0.0.1");
var db1 = dbClient.db('auftraege');
var db2 = dbClient.db('adressen');

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
