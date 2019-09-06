import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
                <div className="footer-left col-12 col-md-4 mb-4 text-center" style={{ transform: 'translate(-6px, 3px)'}}>
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
                <div className="footer-center col-12 col-md-4 p-0 mb-4 text-center" style={{ transform: 'translate(-22px, -1px)'}}>
                    <div className="d-flex justify-content-center">
                        <i class="fas fa-map-marker-alt" style={{ transform: 'translate(37px, 6px)'}}></i>
                        <p>
                            <span>Rivadavia 108</span>
                            Quilmes, Buenos Aires
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i class="fas fa-map-marker-alt" style={{ transform: 'translate(37px, 6px)'}}></i>
                        <p>
                            <span>Constitución 328</span>
                            San Fernando, Buenos Aires
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i class="fas fa-phone mr-3" style={{ transform: 'translate(20px, 5px)'}}></i> 
                        <p>
                            <span>(+54 9 11) 6274-3761</span>
                        </p>
                    </div>
                </div>
                <div className="footer-right col-12 col-md-4 p-0 text-center">
                    <div className="col-12 mb-2" style={{ color: '#fff', fontSize:'20px'}}>Sobre NALAkids</div>
                        NalaKids es una empresa con una trayectoria de mas de 30 años dedicada a la fabricacion de indumentaria para chicos.          
                    <div className="footer-icons d-flex justify-content-center mt-3">
                        <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="icon-footer"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="icon-footer"><i className="fab fa-instagram"></i></a>
                        <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20realizar%20una%20consulta" target="_blank" className="icon-footer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('footer')) {
    ReactDOM.render(<Footer />, document.getElementById('footer'));
}