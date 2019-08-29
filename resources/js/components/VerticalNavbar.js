import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../../public/css/navbarAdmin.css';

export default class VerticalNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    checkPosition(property) {
        return property === this.props.match.url ? 'active' :  '';
    }

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>ADMINISTRACION WEB</h3>
                </div> 
                <ul className="list-unstyled components">
                    <p className="title-config">Configuracion</p>
                    <li className={this.checkPosition('/admin/config/product')}>
                        <Link to={{
                            pathname:'/admin/config/product',
                            state:this.props.location.state,
                        }}>
                            Producto
                        </Link>
                    </li>
                    <li className={this.checkPosition('/admin/config/category')}>
                        <Link to={{
                            pathname:'/admin/config/category',
                            state:this.props.location.state,
                        }}>
                            Categoria
                        </Link>
                    </li>
                    <li className={this.checkPosition('/admin/config/banner')}>
                        <Link to={{
                            pathname:'/admin/config/banner',
                            state:this.props.location.state,
                        }}>
                            Destacados
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