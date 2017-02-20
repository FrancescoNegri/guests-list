import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';
import includes from 'lodash/includes';
import './MainPage.scss';
import "whatwg-fetch";
import startupData from '../../../../shared/startupData.json';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: [],
            filteredGuests: [],
            registeredGuests: 0,
            searchValue: '',
            isLoading: true
        };
        this.searchChange = this.searchChange.bind(this);
        this.updateState = this.updateState.bind(this);

        this.updateDataFromAPI(100);
        this.updateRegisteredGuestsCounter(2000);
    }

    componentDidMount() {
        this.getGuests();
    }

    updateRegisteredGuestsCounter(interval) {
        window.setInterval(() => {
            this.getCounter();
        }, interval);
    }

    getCounter() {
        fetch('http://' + startupData['ip'] + ':4000/guestsCounter')
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.setState({ registeredGuests: json });
            })
    }

    getGuests() {
        fetch('http://' + startupData['ip'] + ':4000/')
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.updateState(json);
            })
    }

    searchChange(event) {
        const searchValue = event.target.value;
        const filteredGuests = this.filterGuest(this.state.guests, searchValue);
        this.setState({ searchValue, filteredGuests });

    }

    filterGuest(arr, string) {
        let results = [];

        arr.map(guest => {
            if (includes((`${guest['NAME']} ${guest['SURNAME']}`).toLowerCase(), string.toLowerCase())) {
                results.push(guest);
            }
        });

        return results;
    }

    render() {
        return (
            <div id="MainPage">
                <h1 className="page-header">Guest List</h1>
                <Link to="/newGuest">
                    <button className="btn btn-success">Aggiungi Persona</button>
                </Link>
                <br />
                <SearchBar value={this.state.searchValue} onChange={this.searchChange} />
                <br />
                <p>{this.state.registeredGuests + "/" + this.state.guests.length}</p>
                <div>{this.renderGuests()}</div>
            </div>
        )
    }

    renderGuests() {
        let guestsOut = [];

        this.state.filteredGuests.forEach((guest) => {
            let item = (
                <div className="guest panel-body" id={"guest-" + guest['ID']}>
                    <p className="left">{guest['NAME'] + ' ' + guest['SURNAME']}</p>
                    {this.renderIfGuest(guest)}
                    {this.renderAge(guest)}
                    {this.renderCheckInButton(guest)}
                </div>
            )
            guestsOut.push(item);
        });

        if (guestsOut.length < 1 && this.state.isLoading) {
            guestsOut = (<Spinner />);
        }

        return guestsOut;
    }

    renderAge(guest) {
        let text;
        text = (guest['ADULT'] == 0) ? '' : '+18';
        return <p>{text}</p>;
    }

    renderIfGuest(guest) {
        let text = '';
        if (guest['GUEST'] == 'E') text = 'ESTERNO';
        if (guest['GUEST'] == 'S') text = 'STAFF';
        return <p>{text}</p>;
    }

    renderCheckInButton(guest) {
        let text, color, cls;

        if (guest['ARRIVED'] == 0) {
            text = 'NON ARRIVATO';
            color = 'yellow';
            cls = "glyphicon glyphicon-remove-circle";
        }
        if (guest['ARRIVED'] == 1) {
            text = 'ARRIVATO';
            color = 'white';
            cls = "glyphicon glyphicon-ok-circle";
        }

        //return (<ButtonComponent onPress={() => this.changeGuestStatus(guest)} text={text}></ButtonComponent>)
        return (<span className={cls} onClick={() => this.changeGuestStatus(guest)} />)
        //return (<Button theme={{ style: { background: color} }} onClick={() => this.changeGuestStatus(guest)}>{text}</Button>);
    }

    changeGuestStatus(guest) {
        fetch('http://' + startupData['ip'] + ':4000/changeStatus/' + guest['ID'])
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.getCounter();
            })
    }

    updateDataFromAPI(interval) {
        window.setInterval(() => {
            this.getGuests();
            this.setState({ isLoading: false })
        }, interval)
    }

    updateState(json) {
        const filteredGuests = this.filterGuest(this.state.guests, this.state.searchValue);
        this.setState({ guests: json, filteredGuests });
    }
}

