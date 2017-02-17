import React from 'react';
import './NewGuestPage.scss';
import "whatwg-fetch";
import startupData from '../../../../shared/startupData.json';

export default class NewGuestPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="NewGuestPage">
                <h1>Aggiungi una nuova persona alla lista!</h1>
                <input id="name" placeholder="Nome" type="text" />
                <br />
                <input id="surname" placeholder="Cognome" type="text" />
                <fieldset>
                    <input id="adult" type="checkbox" />Maggiorenne +18
                    <br />
                    <input id="guest" type="checkbox" />Esterno
                </fieldset>
                <button onClick={() => this.createGuest()}>Aggiungi</button>
                <br />
                <button onClick={() => this.back()}>Annulla</button>
            </div>
        )
    }

    back() {
        window.location = '/';
    }

    createGuest() {
        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;
        if (name.trim() !== '' && surname.trim() !== '') {
            var adult = '0';
            var guest = '0'
            if (document.getElementById('adult').checked) adult = '1';
            if (document.getElementById('guest').checked) guest = 'E';

            var out = { NAME: name, SURNAME: surname, ADULT: adult, GUEST: guest };
            this.uploadGuest(out);
        }
    }

    uploadGuest(guestJSON) {
        fetch('http://' + startupData['ip'] + ':4000/add/' + guestJSON['NAME'] + '/' + guestJSON['SURNAME'] + '/' + guestJSON['ADULT'] + '/' + guestJSON['GUEST'])
            .then((res) => {
                this.back();
            })
    }
}

