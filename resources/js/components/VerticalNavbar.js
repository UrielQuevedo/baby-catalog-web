import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../public/css/navbarAdmin.css';

export default class VerticalNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>ADMINISTRACION WEB</h3>
                </div> 
                <ul className="list-unstyled components">
                    <p className="title-config">Configuracion</p>
                    <li className="active">
                        <Link to={{
                            pathname:'/admin/config/product',
                            state:this.props.location.state,
                        }}>
                            Producto
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname:'/admin/config/category',
                            state:this.props.location.state,
                        }}>
                            Categoria
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname:'/admin/config/banner',
                            state:this.props.location.state,
                        }}>
                            Banner
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

if (document.getElementById('verticalNavbar')) {
    ReactDOM.render(<VerticalNavbar />, document.getElementById('verticalNavbar'));
}