import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class AdminRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { component: Component, ...props } = this.props
        return (
            <Route 
                {...props} 
                render={props => (
                true ?
                <Component {...props} /> :
                <Redirect to='/admin/config/login' />
                )} 
            />
        );
    }
}

