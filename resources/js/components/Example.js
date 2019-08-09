import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.abstractHandlerForANewProduct = this.abstractHandlerForANewProduct.bind(this);
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
            }
        };
    }

    componentDidMount() {
        this.giveAllCategories();
        this.giveAllProducts();
    }

    giveAllProducts() {
        axios.get('/api/product')
            .then(response => this.setState({ products: response.data.data }));
    }

    giveAllCategories() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    handlerCategoryName(event) {
        this.setState({ category_name: event.target.value });
    }

    createCategory() {
        axios.post('/api/category', { category_name: this.state.category_name });
    }

    createCategoryOptionsTable() {
        if (this.state.categories !== []) {
            return this.state.categories.map(category => (
                <option key={category.id} value={category.id}>{category.category_name}</option>
            ));
        }
    }

    createCategoryForm() {
        return (
            <div>
            <div className="form-group">
                <label htmlFor="categorySelector">Seleccione una categoria: </label>
                <select className="form-control" size="5" id="categorySelector" onChange={() => this.handlerCategorySelected()}>
                    {this.createCategoryOptionsTable()}
                </select>
            </div>
            <form>
                <div className="form-group row">
                    <label htmlFor="createCategory" className="col-md-3 col-form-label">Crear una nueva Categoria:</label>
                    <div className="col-md-6">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Escriba un nombre para la Categoria" 
                            id="createCategory" 
                            onChange={ event => this.handlerCategoryName(event) }
                        />
                    </div>
                    <button type="reset" className="col-md-3 btn btn-primary" onClick={() => this.createCategory()}>Crear Categoria</button>
                </div>
            </form>
            </div>
        );
    }

    abstractHandlerForANewProduct(property, value) {
        let prevProduct = this.state.product;
        this.setState({ product : { ...prevProduct, [property]: value } });
    }

    createTitleInput() {
        return (   
            <div className="row">
                <label htmlFor="productTitle" className="col-3 col-md-2 col-form-label"><p className="float-right">Titulo:</p></label>
                <div className="col-9 col-md-10">
                    <input type="text" 
                        className="form-control" 
                        id="productTitle" 
                        placeholder="Ingrese un Titulo"
                        defaultValue={this.state.product.title}
                        onChange={event => this.abstractHandlerForANewProduct('title', event.target.value)} 
                    />
                </div>
            </div>
        );
    }

    createDescriptionInput() {
        return (
            <div className="row">
                <label htmlFor="productDescription" className="col-4 col-md-2 col-form-label"><p className="float-right">Descripcion:</p></label>
                <div className="col-8 col-md-10">
                    <input type="text" 
                    className="form-control" 
                    id="productDescription" 
                    placeholder="Agrega una descripcion"
                    defaultValue={this.state.product.description}
                    onChange={event => this.abstractHandlerForANewProduct('description', event.target.value)} 
                    />
                </div>
            </div>
        );
    }

    createCodeInput() {
        return (
            <div className="row">
                <label htmlFor="productCode" className="col-4 col-md-2 col-form-label"><p className="float-right">Codigo:</p></label>
                <div className="col-8 col-md-10">
                    <input type="text" 
                    className="form-control" 
                    id="productCode" 
                    placeholder="Agrega un codigo"
                    defaultValue={this.state.product.code}
                    onChange={event => this.abstractHandlerForANewProduct('code', event.target.value)} 
                    />
                </div>
            </div>
        );
    }

    createPriceAndPriorityInput() {
        return (
            <div className="row">
                <label htmlFor="productPrice" className="col-3 col-md-2 col-form-label"><p className="float-right">Precio:</p></label>
                <div className="col-9 col-md-4">
                    <input type="number" 
                        className="form-control" 
                        id="productPrice" 
                        placeholder="A partir de 0"
                        defaultValue={this.state.product.price} 
                        onChange={event => this.abstractHandlerForANewProduct('price', event.target.value)}       
                    />
                </div>
                <label htmlFor="priorityProduct" className="col-3 col-md-2 col-form-label"><p className="float-right">Prioridad:</p></label>
                <div className="col-9 col-md-4">
                    <input type="number" 
                        className="form-control" 
                        id="priorityProduct" 
                        placeholder="A partir de 0"
                        defaultValue={this.state.product.priority}
                        onChange={event => this.abstractHandlerForANewProduct('priority', event.target.value)}       
                    />
                </div>
            </div>
        );
    }

    createCategoryAndWaistInput() {
        return (
            <div className="row">
                <label htmlFor="productWaist" className="col-3 col-md-2 col-form-label"><p className="float-right">Talle:</p></label>
                <div className="col-9 col-md-4">
                    <input type="text" 
                        className="form-control" 
                        id="productWaist" 
                        placeholder="Ingrese los talles"
                        defaultValue={this.state.product.waist} 
                        onChange={event => this.abstractHandlerForANewProduct('waist', event.target.value)}       
                    />
                </div>
                <label htmlFor="productCategory" className="col-3 col-md-2 col-form-label"><p className="float-right">Categoria:</p></label>
                <div className="col-9 col-md-4">
                    <select className="form-control" defaultValue={'DEFAULT'} id="categorySelector" onChange={() => this.abstractHandlerForANewProduct('category_id', event.target.value)}>
                        <option disabled="disabled" value="DEFAULT">Elegir</option>
                        {this.createCategoryOptionsTable()}
                    </select>
                </div>
            </div>
        );
    }

    createProduct() {
        axios.post('api/product', this.state.product)
            .catch(error => console.log(error.response));
    }

    createProductForm() {
        return (
            <form encType="multipart/form-data">
                <div className="row">
                    <div className="col-12 col-md-9">
                        {this.createTitleInput()}
                        {this.createDescriptionInput()}
                        {this.createCodeInput()}
                        {this.createPriceAndPriorityInput()}
                        {this.createCategoryAndWaistInput()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="reset" className="btn btn-primary" onClick={() => this.createProduct()}>Crear Producto</button>
                    </div>
                </div>  
            </form>
        );
    }

    createProductTableHead() {
        return (
            <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Code</th>
                    <th scope="col">Talle</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Prioridad</th>
                </tr>
            </thead>
        );
    }

    createARowForTheProductTable(product, i) {
        return (
            <tr key={i}>
                <td>{product.title}</td>
                <td>{product.code}</td>
                <td>{product.waist}</td>
                <td>{product.price}</td>
                <td>{product.category_name}</td>
                <td>{product.priority}</td>
            </tr>
        );
    }

    createProductTableRows() {
        return this.state.products.map((product, i) => (
            this.createARowForTheProductTable(product, i)
        ));
    }

    createProductTable() {
        return(
            <div className="col-12">
                <div className="col-12">
                    <div className="tablaProductos espacioBottom">
                        <table className="table table-bordered table-responsive">
                            {this.createProductTableHead()}
                            <tbody>
                                {this.createProductTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                Administracion
                {console.log(this.props)}
                {this.createCategoryForm()}
                {this.createProductForm()}
                {this.createProductTable()}
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
