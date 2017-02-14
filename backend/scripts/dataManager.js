var guestsList = require('../guests.json');
const fs = require('fs');
var guests = guestsList['ITEMS'];
var idCounter = findMajorId();


module.exports = class DataManager {
    static getGuests() {
        return guests;
    };

    static updateGuestsList() {
        fs.writeFile("./guests.json", JSON.stringify({ ITEMS: guests }), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    static addGuestToGuestsList(guest) {
        if (!arrayContainsObject(guests, guest)) {
            idCounter++;
            guest['ID'] = idCounter;
            guests.push(guest);
            this.updateGuestsList();
        }
    }

    //NON FUNZIONA
    static removeGuestFromGuestsList(guestID) {

        guests = guests.filter((el) => {
            return el['ID'] !== guestID;
        })
        this.updateGuestsList();
    }
};


//UTILITY FUNCTIONS

var arrayContainsObject = (arr, obj) => {
    var out;
    arr.forEach(function (item) {
        if (jsonEqual(item, obj)) {
            out = true;
        }
    }, this);
    if (!out) { out = false };

    return out;
}


function jsonEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function findMajorId() {
    var temp = 0;
    guests.forEach((guest) => {
        if (guest['ID'] > temp) temp = guest['ID'];
    });
    console.log(temp);
    return temp;
}
