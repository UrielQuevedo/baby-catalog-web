import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Example from '../components/Example';
import Home from '../components/Home';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/home" render={props => <div> <Home /></div>} />
                    <Route path="/" render={props => <div> <Example /></div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}

