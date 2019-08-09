import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter, Route, Redirect } from 'react-router';
import '../../../public/css/login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validInfo: '',
        };
    }
    
    logIn() {
        axios.post('/api/auth/login', { email: this.state.email, password: this.state.password })
        .then(response => this.props.history.push(
            {
                pathname:"/admin/config/home",
                state:{ login: true }
            }
        ))
        .catch(() => this.setState({ validInfo: 'Informacion Invalida' }));
    }
    
    handlerPassword(event) {
        this.setState({ password: event.target.value });
    }
    
    handlerEmail(event) {
        this.setState({ email: event.target.value });
    }
    
    inputInvalidEmail() {
        if (this.state.validInfo !== '') {
            return (
                <div className="invalid">
                    {this.state.validInfo}
                </div>
            );
        }
        return undefined;
    }
    
    inputEmail() {
        let classname = 'input100';
        if (this.state.email !== '') {
            classname = 'input100 has-val';
        }
        return (
            <div className="wrap-input100">
                <input className={classname} type="email" id="email" onChange={event => this.handlerEmail(event)} />
                <span className="focus-input100" data-placeholder="Email" />
            </div>
        );
    }
    
    inputPassword() {
        let classname = 'input100';
        if (this.state.password !== '') {
            classname = 'input100 has-val';
        }
        return (
            <div className="wrap-input100">
                <input className={classname} id="password" type="password" onChange={event => this.handlerPassword(event)} onKeyUp={event => this.handlerEnterKey(event)} />
                <span className="focus-input100" data-placeholder="Contraseña" />
            </div>
        );
    }
    
    handlerEnterKey(event) {
        if (event.keyCode === 13) {
            this.logIn();
        }
    }
    
    pushToLogIn() {
        this.props.history.push('/');
    }
    
    render() {
        return (
        <div className="logIn">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-5 offset-lg-4 col-xl-4 offset-xl-4">
                        <div className="logIn-containter">
                            <div className="row justify-content-center logIn-container-img-title">
                                <div className="">
                                    <div className="col-12">
                                        <span className="logIn-title">
                                            Administracion
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {this.inputEmail()}
                            {this.inputPassword()}
                            {this.inputInvalidEmail()}
                            <div>
                                <button type="submit" className="btn btn-block btn-logIn" onClick={() => this.logIn()}> Ingresar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(Login)

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}