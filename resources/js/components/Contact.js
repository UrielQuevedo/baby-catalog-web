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
            <div>
                <h1>CONTACTO</h1>
                <h3>Quilmes</h3>
                Horarios
                Direccion
                Seguinos en nuestras redes y realiza cualquier consulta(FAcebook, instagram, whatsapp)
                <div className="map">
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