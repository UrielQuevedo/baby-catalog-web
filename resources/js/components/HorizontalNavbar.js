import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../../public/css/navbarAdmin.css';

export default class HorizontalNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textButton: 'Ocultar Panel',
        };
    }

    closeSession() {
        axios.post('/api/auth/logout', { token: this.props.location.state.token })
            .then(this.props.history.push('/admin/config/login'))   
    }

    responsiveNavbar() {
        document.getElementById('sidebar').classList.toggle("active");
        this.state.textButton === 'Ocultar Panel' ? this.setState({ textButton: 'Mostrar Panel' }) : this.setState({ textButton: 'Ocultar Panel' });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="prueb">
                    <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={() => this.responsiveNavbar()}>
                            <span>{this.state.textButton}</span>
                    </button> 
                    <button type="button" className="btn btn-danger" onClick={() => this.closeSession()}>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </nav>
        );
    }
}

if (document.getElementById('horizontalNavbar')) {
    ReactDOM.render(<HorizontalNavbar />, document.getElementById('horizontalNavbar'));
}