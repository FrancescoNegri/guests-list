"use strict";
import React from "react";
import './App.scss';

export default class App extends React.Component {
    render() {
        if (!window.sessionStorage['userName']) {
            window.location.href = '/';
        }
        return (
            <section className="container appContainer">
                {this.props.children}
            </section>
        );
    }
}