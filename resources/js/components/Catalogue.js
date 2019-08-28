import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/catalogue.css';

export default class Catalogue extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center mb-5 mt-5">
                    <h1> <span style={{ color: '#e84393', fontSize: '54px' }}>CATALOGO</span></h1>
                </div>
            </div>
        );
    }
}

if (document.getElementById('catalogue')) {
    ReactDOM.render(<Catalogue />, document.getElementById('catalogue'));
}