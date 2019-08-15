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
        this.addProductToBanner = this.addProductToBanner.bind(this);
        this.removeProductFromBanner = this.removeProductFromBanner.bind(this);
        this.state = {
            banner: {
                id: '',
                title: '',
                products: [],
            },
            errorEdit: '',
            newTitle: '',
            products: [],
            productSelected: '',
            productBannerSelected: '',
            errorSelectProduct: '',
            errorRemoveProduct: '',
        };
    }

    componentDidMount() {
        this.giveBanner();
        this.giveAllProducts();
    }

    giveAllProducts() {
        axios.get('/api/product')
            .then(response => this.setState({ products: response.data.data }));
    }

    giveBanner() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data, products_banner: response.data.products }))
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

    addProductToBanner() {
        axios.post(`/api/banner/${this.state.banner.id}/${this.state.productSelected.id}`, { token: this.props.location.state.token})
            .then(response => this.setState({ banner: response.data.data }), this.abstractHandler('errorSelectProduct', ''))
            .catch(error => this.setState({ errorSelectProduct: error.response.data.error }));
    }

    removeProductFromBanner() {
        axios.put(`/api/banner/${this.state.banner.id}/${this.state.productBannerSelected.id}`, { token: this.props.location.state.token})
            .then(response => this.setState({ banner: response.data.data }), this.abstractHandler('errorRemoveProduct', ''))
            .catch(error => this.setState({ errorRemoveProduct: error.response.data.error }));
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

    createHeaderTable() {
        return (
            <tr>
                <th className="cell">Codigo</th>
                <th className="cell" data-priority="1">Titulo</th>
                <th className="cell" data-priority="2">Prioridad</th>
                <th className="cell" data-priority="3">Precio</th>
                <th className="cell" data-priority="4">Categoria</th>
            </tr>
        );
    }

    createProductTableBanner(id, product) {
        var classN = '';
        if(product === this.state.productBannerSelected) {
            classN = 'rowSelected';
        }
        return (
            <tr className={"rowTable " + classN} key={id} onClick={() => this.abstractHandler('productBannerSelected', product)}>
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td>{product.priority}</td>
                <td>{product.price}</td>
                <td>{product.category.category_name}</td>
            </tr>
        );
    }

    createTrProductsBannerTable() {
        return this.state.banner.products.map(product => (
            this.createProductTableBanner(product.code+'TR'+'ProductBanner',product)
        ));
    }

    createProductBannerTable() {
        if(this.state.banner.products.length !== 0) {
            return (
                <div className="col-xs-12">
                    <span className="lines-style">Productos Destacados</span>
                    {this.showErrors(this.state.errorRemoveProduct)}
                    <div className="table-responsive wrap-table" data-pattern="priority-columns">
                        <table className="table table-hover">
                            <thead className="theadTable">
                                {this.createHeaderTable()}
                            </thead>
                            <tbody>
                                {this.createTrProductsBannerTable()}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => this.removeProductFromBanner()}>Sacar</button>
                </div>
            );
        }
        return (
            <div className="alert alert-primary" role="alert">
                No hay productos en el banner aún.
            </div>
        );
    }

    createTrProduct(id, product) {
        var classN = '';
        if(product === this.state.productSelected) {
            classN = 'rowSelected';
        }
        return (
            <tr className={"rowTable " + classN} key={id} onClick={() => this.abstractHandler('productSelected', product)}>
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td>{product.priority}</td>
                <td>{product.price}</td>
                <td>{product.category_name}</td>
            </tr>
        );
    }

    createTrProductsTable() {
        return this.state.products.map(product => (
            this.createTrProduct(product.code+'TR'+'ProductTable', product)
        ));
    }

    createProductTable() {
        if(this.state.products.length !== 0) {
            return (
                <div className="col-xs-12">
                    <span className="lines-style">Productos</span>
                    {this.showErrors(this.state.errorSelectProduct)}
                    <div className="table-responsive wrap-table" data-pattern="priority-columns">
                        <table className="table table-hover">
                            <thead className="theadTable">
                                {this.createHeaderTable()}
                            </thead>
                        <tbody>
                            {this.createTrProductsTable()} 
                        </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => this.addProductToBanner()}>Agregar</button>
                </div>
            );
        }
        return (
            <div className="alert alert-primary" role="alert">
                No hay productos cargados aún.
            </div>                              
        );
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