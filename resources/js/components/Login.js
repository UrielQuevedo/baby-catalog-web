import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container">
                Login
            </div>
        );
    }
}

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}