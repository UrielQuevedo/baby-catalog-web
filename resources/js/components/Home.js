import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container">
                Home
            </div>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}