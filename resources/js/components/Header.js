import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import '../../../public/css/page.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    isActive(possiblePathname) {
        return window.location.pathname.includes(possiblePathname) ? 'itemNavActive' : '';
    }

    isActiveHome() {
        return window.location.pathname === "/" ? 'itemNavActive' : ''; 
    }

    render() {
        return (
            <React.Fragment>
                <div className="row d-flex justify-content-center mr-0 banner">
                    <a href="/"><img src="https://res.cloudinary.com/dddzzcrzg/image/upload/v1566572950/NalaTitle_owkurc.png" role="presentation" style={{ cursor:'pointer' }}/></a>
                </div>
                <nav className="header">
                    <div className="icons ml-4">
                        <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="mr-5"><i className="fab fa-facebook-square"></i></a>
                        <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="mr-5"><i className="fab fa-instagram"></i></a>
                        <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20realizar%20una%20consulta" target="_blank"><i className="fab fa-whatsapp"></i></a>
                    </div>
                    <input type="checkbox" id="chk" />
                    <label htmlFor="chk" className="show-menu-btn">
                        <i className="fas fa-bars"></i>
                    </label>

                    <ul className="menu">
                        <a href="/"> <span className={this.isActiveHome()}>Inicio</span></a>
                        <a href="/catalogue"> <span className={this.isActive('/catalogue')}>Catalogo</span></a>
                        <a href="/contacts"> <span className={this.isActive('/contacts')}>Contacto</span></a>
                        <a href="/aboutUs"> <span className={this.isActive('/aboutUs')}>Quienes Somos</span></a>
                        <label htmlFor="chk" className="hide-menu-btn">
                            <i className="fas fa-times"></i>
                        </label>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

if (document.getElementById('header')) {
    ReactDOM.render(<Header />, document.getElementById('header'));
}