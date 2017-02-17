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
            </div>
        )
    }
}

