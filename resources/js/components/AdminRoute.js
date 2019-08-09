import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export default class AdminRoute extends Component {

    componentDidMount() {}

    render() {
        const { component: Component, ...props } = this.props
        return (
            <Route 
                {...props} 
                render={props => (
                props.location.state !== undefined && props.location.state.login ?
                <Component {...props} /> :
                <Redirect to='/admin/config/login' />
                )} 
            />
        );
    }
}

