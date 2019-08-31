import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/contact.css';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center mb-4 mt-5">
                    <h1> <span style={{ color: '#e84393', fontSize: '54px' }}>CONTACTO</span></h1>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <h2>Quilmes</h2>
                </div>
                <div className="container">
                    <div className="row box-info">
                        <div className="col-12 col-md-4 text-center mb-4">
                            <h5 className="mt-4 mb-2">Horarios</h5>
                            <div>Lunes-Viernes: 9am - 8pm</div>
                            <div>Sabados: 9am - 8pm</div>
                            Domingos: <span style={{ color: 'red' }}>Cerrado</span>
                        </div>
                        <div className="col-12 col-md-4 text-center mb-4">
                            <h5 className="mt-4 mb-2">Direccion</h5>
                                <div>Rivadavia 108</div>
                                Quilmes, Buenos Aires
                        </div>
                        <div className="col-12 col-md-4 text-center mb-4">
                            <div>
                                <h5 className="mt-4 mb-2">Redes</h5>
                            </div>
                            <div>
                                <div className="mb-2">Seguinos en nuestras redes y consultanos cualquier duda.</div>
                                <div className="mb-2">
                                    <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20realizar%20una%20consulta" target="_blank" className="mr-4"><i className="fab fa-whatsapp icon-contact"></i></a>
                                    <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="mr-4 icon-contact"><i className="fab fa-instagram"></i></a>
                                    <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank"><i className="fab fa-facebook icon-contact"></i></a>
                                </div>
                                tel:. (+54 9 11) 6274.3761
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map mt-5 mb-2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.278094120835!2d-58.259949000000006!3d-34.723383999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32e6ae51b62dd%3A0x5c7d3fff9eab9d9a!2sNala%20kids!5e0!3m2!1ses-419!2sar!4v1566922805225!5m2!1ses-419!2sar" 
                        width="600" 
                        height="450"
                        style={{border:'0'}}
                        frameborder="0"
                        allowFullScreen></iframe>    
                        
                </div>    
            </div>
        );
    }
}

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}