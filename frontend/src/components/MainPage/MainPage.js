import React from 'react';
import './MainPage.scss';
import "whatwg-fetch";
import startupData from '../../../../shared/startupData.json';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { guests: [] };
        this.updateState = this.updateState.bind(this);
        this.renderGuests = this.renderGuests.bind(this);

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
                    {/* Settare il checkbox vero o falso a seconda del field ARRIVED */}
                    <input type="checkbox"/>
                </div>
            )
            guestsOut.push(item);
        })

        return guestsOut;
    }

    updateDataFromAPI(interval) {
        window.setInterval(() => {
            console.log('calling');
            this.getGuests();
        }, interval)
    }

    updateState(json) {
        this.setState({ guests: json });
    }
}

