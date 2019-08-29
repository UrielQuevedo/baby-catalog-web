import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect, Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ConfigProduct from '../components/ConfigProduct';
import Home from '../components/Home';
import AdminRoute from '../components/AdminRoute';
import Login from '../components/Login';
import Footer from '../components/Footer';
import ConfigCategory from '../components/ConfigCategory';
import ConfigBanner from '../components/ConfigBanner';
import Contact from "./Contact";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Catalogue from "./Catalogue";
import Axios from "axios";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
        };
    }

    componentDidMount() {
        Axios.get('/api/category')
            .then(response => this.setState({ category_id: response.data.data[0].id }))
            .catch(error => console.log(error));
    }

    redirect() {
        return  <Redirect to={`/catalogue/${this.state.category_id}`} />
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/admin/config/login" component={Login} />
                    <AdminRoute path='/admin/config/product' component={ConfigProduct} />
                    <AdminRoute path='/admin/config/category' component={ConfigCategory} />
                    <AdminRoute path='/admin/config/banner' component={ConfigBanner} />
                    <Route exact path="/contacts" render={() => <div className="box"><Header /><Contact /><Footer /></div>} />
                    <Route exact path="/aboutUs" render={() => <div className="box"><Header /><AboutUs /><Footer /></div>} />
                    <Route exact path="/catalogue" render={() => this.redirect()} />
                    <Route exact path="/catalogue/:idCategory" render={() => <div className="box"><Header /><Catalogue /><Footer /></div>} />
                    <Route path="/" render={() => <div className="box"><Header /><Home /><Footer /></div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}

