'use strict;'

const express = require('express');
const app = express();
const dataManager = require('./scripts/dataManager.js');
const bodyParser = require('body-parser');
const ip = require('ip');
const fs = require('fs');

const port = 4000;

//ROUTING

app.set('view engine', 'pug');

app.use(bodyParser.text());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();


    console.log(datetime, '- Request:', req.method, '-', req.url);

    next();
});

app.get('/', (req, res) => {
    res.send(dataManager.getGuests());
})

app.get('/add/:name/:surname/:adult/:guest', (req, res) => {
    if (req.params['guest'] == '0') req.params['guest'] = "";
    res.send(dataManager.addGuestToGuestsList({NAME: req.params['name'], SURNAME: req.params['surname'], 'ADULT': Number.parseInt(req.params['adult']), 'GUEST': req.params['guest'], 'ARRIVED': 0}));
})

app.get('/remove/:id', (req, res) => {
    console.log(req.params);
    res.send(dataManager.removeGuestFromGuestsList(req.params['id']));
})

app.get('/changeStatus/:id', (req, res) => {
    res.send(dataManager.changeGuestStatus(req.params['id']));
})

app.post('/checkout', (req, res) => {
        
})

app.listen(port, () => {
    console.log('Server listening on port ' + port.toString());
})

//END ROUTING

//Crea file e cartella SHARED
if (!fs.existsSync('../shared')){
    fs.mkdirSync('../shared');
}
fs.writeFile("../shared/startupData.json", JSON.stringify({ip: ip.address().toString()}), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("My IP is:", ip.address());
});





