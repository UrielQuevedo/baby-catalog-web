import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/contact.css';

export default class AboutUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center mb-5 mt-5 text-center">
                    <h1> <span style={{ color: '#e84393', fontSize: '54px' }}>QUIENES SOMOS</span></h1>
                </div>
                <div className="container">
                <div className="row d-flex justify-content-center text-center mb-5">
                    <div className="col col-12 col-md-8 col-lg-7 descriptonLocal">
                        <p>
                            Nala kids es una empresa con una trayectoria de más de 30 años dedicada a la fabricación de indumentaria para chicos.
                        </p>
                        <p>
                            Fue creada con el desafío de diseñar ropa divertida para chicos de 0 a 12 años.
                        </p>
                        <p>
                            La integridad de la oferta, la coordinación entre artículos, el correcto equilibrio entre el contenido creativo y la practicidad, acompañado de un precio competitivo son las características principales de Nala kids.
                        </p>
                        <p>
                            Visitá nuestro <a href="/catalogue" style={{ color: '#ea5a93' }}>Catalogo</a> online.
                        </p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('aboutUs')) {
    ReactDOM.render(<AboutUs />, document.getElementById('aboutUs'));
}