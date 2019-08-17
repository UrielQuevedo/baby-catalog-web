import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../../public/css/configBanner.css';

export default class ConfigProduct extends Component {

    constructor(props) {
        super(props);
        this.abstractHandlerForANewProduct = this.abstractHandlerForANewProduct.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.abstractHandler = this.abstractHandler.bind(this);
        this.searchByCode = this.searchByCode.bind(this);
        this.state = {
            category_name: '',
            categories: [],
            products: [],
            product: {
                title: '',
                description: '',
                code: '',
                price: '',
                priority: '',
                waist: '',
                category_id: '',
            },
            category_selected:'none',
            searchCode: '',
            errorSearchByCode: '',
        };
    }

    componentDidMount() {
        this.giveAllCategories();
    }

    giveAllCategories() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    abstractHandlerForANewProduct(property, value) {
        let prevProduct = this.state.product;
        this.setState({ product : { ...prevProduct, [property]: value } });
    }

    /*
    
            ////////////////////////// TABLE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    */

    handleChangeSelect(event) {
        this.setState({ category_selected: event.target.value });
        axios.get(`/api/product/byCategory/${event.target.value}`)
            .then(response => this.setState({ products: response.data.data }))
            .catch(error => console.log(error.response.data.error));    
    }

    abstractHandler(property, value) {
        this.setState({ [property]: value } );
    }

    searchByCode() {
        if(this.state.searchCode !== '') {
            axios.get(`/api/product/byCode/${this.state.searchCode}`)
                .then(response => this.setState({ products: response.data.data, errorSearchByCode: '' }))
                .catch(error => this.abstractHandler('errorSearchByCode', error.response.data.error))
        } else if(this.state.category_selected !== 'none') {
            axios.get(`/api/product/byCategory/${this.state.category_selected}`)
                .then(response => this.setState({ products: response.data.data }))
                .catch(error => console.log(error.response));   
        }
    }

    createProduct() {
        axios.post('/api/product', this.state.product, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .catch(error => console.log(error.response.data));
    }

    createTableProduct() {
        if(this.state.products.length !== 0) {
            return (
                <div>
                    <div className="table-responsive wrap-table mb-4 scrollTable" data-pattern="priority-columns">
                        <table className="table table-hover">
                            <thead className="theadTable">
                                {this.createHeaderTable()}
                            </thead>
                            <tbody>
                                {this.createTrProductsTable()} 
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 col-md-auto mr-auto mb-4">
                            <button className="btn btn-primary col-12">Editar </button>
                        </div>
                        <div className="col-12 col-md-4 col-md-auto mb-4">
                            <button className="btn btn-danger col-12">Borrar </button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="alert alert-warning" role="alert">
                Seleccione una categoria o busque un producto por su codigo.
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

    createOptions() {
        return this.state.categories.map((category, i) => (
            <option key={i + 'optionFilter'} value={category.id}>{category.category_name}</option>
        ));
    }

    createWrapperFilterProducts() {
        return (
            <div className="col-xs-12">
                <div class="row justify-content-around">
                    <div className="col-12 col-md-4 p-0 mb-3">
                        <label htmlFor="categoryChange" className="col-12 col-form-label">Seleccione una Categoria:</label>
                        <div class="col-12">
                            <select className="form-control" value={this.state.category_selected} onChange={this.handleChangeSelect}>
                                <option disabled="disabled" value="none">Elegir</option>
                                {this.createOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-0 mb-3">
                        <label htmlFor="categoryChange" className="col-12 col-form-label">Buscar por Codigo:</label>
                        <div class="col-12 mb-3">
                            <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Buscar Codigo" 
                                    onChange={event => this.abstractHandler('searchCode', event.target.value)} />
                        </div>
                        <div class="col-12">
                            <button type="button" className="btn btn-primary col-12" onClick={() => this.searchByCode()}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
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

    createWrapperProducts() {
        if(this.state.categories.length !== 0) {
            return (
                <div className="col-xs-12 mb-4">
                    <span className="lines-style">Productos</span>
                    {this.showErrors(this.state.errorSearchByCode)}
                    {this.createWrapperFilterProducts()}
                    {this.createTableProduct()}
                </div>
            );
        }
        return (
            <div className="alert alert-primary" role="alert">
                No hay productos cargados aún.
            </div>                              
        );
    }

    /*
            ///////////////////////////// Product Form \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    */

    createWrapperProductFrom() {
        return (
            <form className="col-xs-12 mb-4">
                <span className="lines-style">Crear o Editar Producto</span>
                <div className="row">
                    <div className="col-12 col-md-6 col-md-auto mr-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Titulo:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="text" class="form-control" id="inputPassword" placeholder="Ingrese un Titulo" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-md-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Codigo:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="text" class="form-control" id="inputPassword" placeholder="Codigo del Producto" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-md-auto mr-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Precio:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="number" class="form-control" id="inputPassword" placeholder="A partir de 0" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-md-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Prioridad:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="number" class="form-control" id="inputPassword" placeholder="A partir de 0" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-md-auto mr-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Talle:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="number" class="form-control" id="inputPassword" placeholder="Ingrese los Talles" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-md-auto row pr-0">
                        <label for="inputPassword" class="col-md-2 col-form-label">Categoria:</label>
                        <div class="col-md-9 mb-3 pr-0">
                            <input type="number" class="form-control" id="inputPassword" placeholder="Elegir" />
                        </div>
                    </div>
                    <div className="col-12 row pr-0">
                        <label for="inputPassword" class="col-md-1 col-form-label mr-3">Descripcion:</label>
                        <div class="col-md-10 mb-3 pr-0">
                            <input type="text" class="form-control" id="inputPassword" placeholder="Agregar una Descripcion" />
                        </div>
                    </div>
                    <div class="col-12 row justify-content-around pr-0">
                        <div class="col-12 col-md-6 d-flex justify-content-end pr-0 mb-4">
                            <button className="col-12 col-md-6 btn btn-success">Crear</button>
                        </div>
                        <div class="col-12 col-md-6 pr-0 mb-4">
                            <button className="col-12 col-md-6 btn btn-primary">Aplicar</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                {this.createWrapperProductFrom()}
                {this.createWrapperProducts()}
            </div>
        );
    }
}

if (document.getElementById('configProduct')) {
    ReactDOM.render(<ConfigProduct />, document.getElementById('configProduct'));
}
