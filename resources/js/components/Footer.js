import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../public/css/footer.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-left col-12 col-md-4 mb-4">
                    <div className="col-12">
                        <h3>NALA KIDS</h3>
                    </div>
                    <p className="company-name col-12">
                        &copy;NALAKIDS 
                        <div>
                            Todos los derechos reservados
                        </div>
                    </p>
                </div>
                <div className="footer-center col-12 col-md-4 p-0 mb-4">
                    <div>
                        <i class="fas fa-map-marker-alt"></i>
                        <p>
                            <span>Rivadavia 108</span>
                            Quilmes, Buenos Aires
                        </p>
                    </div>
                    <div>
                        <i class="fas fa-envelope mr-2"></i> 
                        <p>
                            <a href="mailto:nalaquilmes@gmail.com">nalaquilmes@gmail.com</a>
                        </p>
                    </div>
                    <div>
                        <i class="fas fa-phone mr-3"></i> 
                        <p>
                            <span>(+54 9 11) 6274-3761</span>
                        </p>
                    </div>
                </div>
                <div className="footer-right col-12 col-md-4 p-0">
                    <div className="col-12 mb-2" style={{ color: '#fff', fontSize:'20px'}}>Sobre NALAkids</div>
                    <span style={{ textAlign:'center'}}>
                        NalaKids es una empresa con una trayectoria de mas de 30 años dedicada a la fabricacion de indumentaria para chicos.          
                    </span>
                    <div className="footer-icons d-flex justify-content-start mt-3">
                        <a href="#" className="icon-footer"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon-footer"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="icon-footer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('footer')) {
    ReactDOM.render(<Footer />, document.getElementById('footer'));
}