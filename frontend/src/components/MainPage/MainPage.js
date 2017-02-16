import React from 'react';
import './MainPage.scss';
import "whatwg-fetch";
import startupData from '../../../../shared/startupData.json';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { guests: [] };
        this.updateState = this.updateState.bind(this);

        this.updateDataFromAPI(1000);
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
                <div className="guest" id={"guest-" + guest['ID']}>
                    <p>{guest['NAME'] + ' ' + guest['SURNAME']}</p>
                    {this.renderIfGuest(guest)}
                    {this.renderAge(guest)}
                    {this.renderCheckInButton(guest)}
                </div>
            )
            guestsOut.push(item);
        })

        return guestsOut;
    }

    renderAge(guest) {
        var text;
        if (guest['ADULT'] == 0) text = '';
        if (guest['ADULT'] == 1) text = '+18';
        return <p>{text}</p>;
    }

    renderIfGuest(guest) {
        var text = '';
        if (guest['GUEST'] == 'E') text = 'ESTERNO';
        if (guest['GUEST'] == 'S') text = 'STAFF';
        return <p>{text}</p>;
    }

    renderCheckInButton(guest) {
        var text = 'testo';
        var color;
        var image;
        if (guest['ARRIVED'] == 0) {
            text = 'NON ARRIVATO';
            color = 'yellow';
            image = 'https://img.clipartfest.com/6a44fc39e4a76cd767714a888be3d423_ticks-and-crosses-clipart-clipart-tick-and-cross_600-600.svg';
        }
        if (guest['ARRIVED'] == 1) {
            text = 'ARRIVATO';
            color = 'white';
            image = 'http://www.vivocafe.com.au/auto/thumbnail/persistent/article_images/smv-logo--tick.jpg';
        }

        //return (<ButtonComponent onPress={() => this.changeGuestStatus(guest)} text={text}></ButtonComponent>)
        return (<img src={image} onClick={() => this.changeGuestStatus(guest)} height="50" width="50" />)
        //return (<Button theme={{ style: { background: color} }} onClick={() => this.changeGuestStatus(guest)}>{text}</Button>);
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

