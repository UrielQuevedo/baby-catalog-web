import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Example from '../components/Example';
import Home from '../components/Home';
import AdminRoute from '../components/AdminRoute';
import Login from '../components/Login';

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
                    <Route exact path="/admin/config/login" render={props => <div> <Login /> </div>} />
                    <AdminRoute path='/admin/config/home' component={Example} />
                    <Route path="/" render={props => <div> <Home /></div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}

