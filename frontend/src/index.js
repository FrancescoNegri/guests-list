"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import App from './components/App/App';
import MainPage from './components/MainPage/MainPage';
import NewGuestPage from './components/NewGuestPage/NewGuestPage';


const cont = (
    <Router history={hashHistory}>
        <Route path="/" component={MainPage}/>
        <Route path="/" component={App}>
            <Route path="newGuest" component={NewGuestPage}/>
        </Route>
    </Router>
);

ReactDOM.render(cont, document.getElementById("root"));
