import React, { Component } from "react";
import { Route, Redirect } from 'react-router';
import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';

export default class AdminRoute extends Component {

    componentDidMount() {}

    render() {
        const { component: Component, ...props } = this.props
        return (
            <Route 
                {...props} 
                render={props => (
                props.location.state !== undefined && props.location.state.login 
                    ?
                    <div className="wrapper">
                        <VerticalNavbar {...props} />
                        <div className="container-fluid">
                            <HorizontalNavbar {...props} />
                            <Component {...props} />
                        </div>
                    </div> 
                    :
                <Redirect to='/admin/config/login' />
                )} 
            />
        );
    }
}

