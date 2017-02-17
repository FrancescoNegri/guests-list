"use strict";
import React from "react";
import "./SearchBar.scss";

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-group search-bar">
                <input type="text" className="form-control" onChange={this.props.onChange} value={this.props.value}
                       placeholder="Cerca" aria-describedby="sizing-addon2"/>
                <span className="input-group-addon" id="sizing-addon2">
                        <span className="glyphicon glyphicon-search"/>
                    </span>
            </div>);
    }

}
