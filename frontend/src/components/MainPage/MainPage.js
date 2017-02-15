import React from 'react';
import './MainPage.scss';
import "whatwg-fetch";
import Checkbox from 'rc-checkbox';
import startupData from '../../../../shared/startupData.json';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { guests: [] };
        this.updateState = this.updateState.bind(this);
        this.renderGuests = this.renderGuests.bind(this);
        this.renderCheckBox = this.renderCheckBox.bind(this);

        this.updateDataFromAPI(2000);
    }

    componentDidMount() {
        this.getGuests();
    }

    getGuests() {
        fetch('http://' + startupData['ip'] + ':4000/')
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.updateState(json);
            })
    }

    render() {
        return (
            <div id="MainPage">
                <h1>Guests List</h1>
                {this.renderGuests()}
            </div>
        )
    }

    renderGuests() {
        let guestsOut = [];

        this.state.guests.forEach((guest) => {
            let item = (
                <div className="guest">
                    <p>{guest['NAME'] + ' ' + guest['SURNAME'] + ' ' + guest['ID']}</p>
                    {this.renderCheckBox(guest)}
                </div>
            )
            guestsOut.push(item);
        })

        return guestsOut;
    }

    //GESTISCI ESTERNI E STAFF

    renderCheckBox(guest) {
        var text;
        if (guest['ARRIVED'] == 0) {
            text = 'mucca';
        }
        if (guest['ARRIVED'] == 1) {
            text = 'pollo';
        }

        return (
            <button onClick={() => {this.changeGuestStatus(guest)}}>{text}</button>
        )
    }

    changeGuestStatus(guest) {
        fetch('http://' + startupData['ip'] + ':4000/changeStatus/' + guest['ID'])
            .then((res) => {
                return res.json()
            }).then((json) => {
            })
        
    }

    updateDataFromAPI(interval) {
        window.setInterval(() => {
            this.getGuests();
        }, interval)
    }

    updateState(json) {
        this.setState({ guests: json });
    }
}

