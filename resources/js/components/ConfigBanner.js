import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../../public/css/configBanner.css';

export default class ConfigBanner extends Component {

    constructor(props) {
        super(props);
        this.abstractHandler = this.abstractHandler.bind(this);
        this.createANewBanner = this.createANewBanner.bind(this);
        this.sendEditBannerTitle = this.sendEditBannerTitle.bind(this);
        this.state = {
            banner: {
                id: '',
                title: '',
                products: [],
            },
            errorEdit: '',
            newTitle: '',
            products: [],
        };
    }

    componentDidMount() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error.response));
    }

    abstractHandler(property, value) {
        this.setState({ [property]: value } );
    }

    createANewBanner() {
        axios.post('/api/banner', { title: this.state.newTitle }, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.setState({ banner: response.data.data }), this.abstractHandler('errorEdit', ''))
            .catch(error => this.setState({ errorEdit: error.response.data.error }));
    }

    sendEditBannerTitle() {
        axios.put(`/api/banner/${this.state.banner.id}`, { title: this.state.newTitle }, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.setState({ banner: response.data.data }), this.abstractHandler('errorEdit', ''))
            .catch(error => this.setState({ errorEdit: error.response.data.error }));
    }

    firstBanner() {
        if(this.state.banner == '') {
            return (
                <div>
                    <div className="mb-2">
                        <span style={{ fontSize: 17, color: '#2b2424' }}>Eliga un Titulo para su Panel de Destacados:</span>
                    </div>
                    <form>
                        <div className="form-group row">
                            <div className="col-md-6 mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Escriba un titulo" 
                                    onChange={ event => this.abstractHandler('newTitle', event.target.value) }
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="reset" className="btn btn-success col-12" onClick={() => this.createANewBanner()}>Crear</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        return undefined;
    }

    showErrors(error) {
        if(error !== '') {
            return (
                <div>
                    <p style={{ color: 'red' }}>
                        {error}
                    </p>
                </div>
            );
        }  
        return undefined;
    }

    createEditNameInput() {
        return (
            <div>
                <div>
                    <span style={{ color: 'grey' }}> Titulo actual: </span>
                </div>
                <div className="mb-4">
                    <span style={{ fontSize: 40, color: '#54545f' }}>{this.state.banner.title}</span>
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="editNameBanner" className="col-md-2 col-form-label">Cambiar titulo:</label>
                        <div className="col-md-6 mb-3">
                            <input type="text" 
                                className="form-control" 
                                placeholder="Escriba un nuevo titulo" 
                                id="editNameBanner" 
                                onChange={ event => this.abstractHandler('newTitle', event.target.value) }
                            />
                        </div>
                        <div className="col-md-3">
                            <button type="reset" className="btn btn-primary col-12" onClick={() => this.sendEditBannerTitle()}>Cambiar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    createProductBannerTable() {
        return (
            <div className="col-xs-12">
                <span className="lines-style">Productos Destacados</span>
                <div className="table-responsive wrap-table" data-pattern="priority-columns">
                    <table className="table table-hover">
                        <thead className="theadTable">
                            <tr>
                            <th className="cell">Codigo</th>
                            <th className="cell" data-priority="1">Titulo</th>
                            <th className="cell" data-priority="2">Prioridad</th>
                            <th className="cell" data-priority="3">Precio</th>
                            <th className="cell" data-priority="4">Categoria</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr className="rowTable">
                            <td>Argentina</td>
                            <td>Spanish (official),</td>
                            <td>41,803,125</td>
                            <td>31.3</td>
                            <td>2,780,387</td>
                        </tr>
                        <tr>
                            <td>Australia</td>
                            <td>English 79%,</td>
                            <td>23,630,169</td>
                            <td>37.3</td>
                            <td>7,739,983</td>
                        </tr>
                        <tr>
                            <td>Greece</td>
                            <td>Greek 99% </td>
                            <td>11,128,404</td>
                            <td>43.2</td>
                            <td>131,956</td>
                        </tr>
                        <tr>
                            <td>Luxembourg</td>
                            <td>Luxermbourgish </td>
                            <td>536,761</td>
                            <td>39.1</td>
                            <td>2,586</td>
                        </tr>
                        <tr>
                            <td>Russia</td>
                            <td>Russian, others</td>
                            <td>142,467,651</td>
                            <td>38.4</td>
                            <td>17,076,310</td>
                        </tr>
                        <tr>
                            <td>Sweden</td>
                            <td>Swedish, small S</td>
                            <td>9,631,261</td>
                            <td>41.1</td>
                            <td>449,954</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <button className="btn btn-danger">Sacar</button>
            </div>
        );
    }

    createTrProduct() {
        return this.state.products.map( product => (
            <tr className="rowTable">
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td>{product.priority}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
            </tr>
        ));
    }

    createProductTable() {
        if(this.state.products.length !== 0) {
            return (
                <div className="col-xs-12">
                    <span className="lines-style">Productos</span>
                    <div className="table-responsive wrap-table" data-pattern="priority-columns">
                        <table className="table table-hover">
                            <thead className="theadTable">
                                <tr>
                                <th className="cell">Codigo</th>
                                <th className="cell" data-priority="1">Titulo</th>
                                <th className="cell" data-priority="2">Prioridad</th>
                                <th className="cell" data-priority="3">Precio</th>
                                <th className="cell" data-priority="4">Categoria</th>
                                </tr>
                            </thead>
                        <tbody>
                            {this.createTrProduct()} 
                        </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        /*
            Retornar algo mas lindo
        */
        return undefined;
    }

    render() {
        if(this.state.banner == '') {
            return (
                <div className="container">
                    {this.firstBanner()}
                    {this.showErrors(this.state.errorEdit)}
                </div>
            );
        }
        return (
            <div className="container">
                {this.createEditNameInput()}
                {this.showErrors(this.state.errorEdit)}
                {this.createProductBannerTable()}
                {this.createProductTable()}
            </div>
        );
    }
}

if (document.getElementById('configBanner')) {
    ReactDOM.render(<ConfigBanner />, document.getElementById('configBanner'));
}