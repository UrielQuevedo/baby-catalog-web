import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../../public/css/configBanner.css';
import Crop from '../components/Crop';

export default class ConfigProduct extends Component {

    constructor(props) {
        super(props);
        this.abstractHandlerForAProduct = this.abstractHandlerForAProduct.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.abstractHandler = this.abstractHandler.bind(this);
        this.searchByCode = this.searchByCode.bind(this);
        this.handlerEditProductSend = this.handlerEditProductSend.bind(this);
        this.handlerEdit = this.handlerEdit.bind(this);
        this.state = {
            category_name: '',
            categories: [],
            products: [],
            product: {
                image_url: '',
                title: '',
                description: '',
                code: '',
                offer: false,
                price: 1,
                priority: 1,
                waist: '',
                category_id: '',
            },
            product_selected: '',
            image_selected: '',
            category_selected:'none',
            searchCode: '',
            errorSearchByCode: '',
            errorCreateProduct: '',
            errorToEdit: '',
        };
    }

    componentDidMount() {
        this.giveAllCategories();
    }

    giveAllCategories() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    abstractHandlerForAProduct(property, value) {
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

    resetProduct() {
        this.setState({
            image_selected:'',
            product_selected: '',
            product: {
                id: undefined,
                image_url: '',
                title: '',
                description: '',
                code: '',
                offer:false,
                price: 1,
                priority: 1,
                waist: '',
                category_id: '',
            }
        });
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

    giveAllProductsByCategoryIfSelected(data) {
        if(parseInt(data.category_id) === parseInt(this.state.category_selected)) {
            axios.get(`/api/product/byCategory/${this.state.category_selected}`)
                .then(response => this.setState({ products: response.data.data }))
                .catch(error => console.log(error.response.data.error));  
        } else if (this.state.searchCode !== '') {
            this.setState({ products: [] });
        }
    }

    createProduct() {
        axios.post('/api/product', this.state.product, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.giveAllProductsByCategoryIfSelected(response.data.data), this.resetProduct(), this.abstractHandler('errorCreateProduct', ''))
            .catch(error => this.setState({ errorCreateProduct: error.response.data.error }));
    }

    handlerEdit() {
        let product_to_edit = this.state.product_selected;
        if(product_to_edit === '') {
            this.setState({ errorToEdit: 'Seleccione un Producto de la Tabla.' })
        } else {
            this.setState({ product: product_to_edit, errorToEdit: '' });
        }
    }

    handlerDelete() {
        let data = { category_id: this.state.product_selected.category_id };
        axios.delete(`/api/product/${this.state.product_selected.id}`, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(this.giveAllProductsByCategoryIfSelected(data), this.setState({ product_selected: '', errorToEdit:'' }))
            .catch(error => this.setState({ errorToEdit: error.response.data.error }));
    }

    handlerEditProductSend() {
        axios.put(`/api/product/${this.state.product.id}`, this.state.product, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.giveAllProductsByCategoryIfSelected(response.data.data), this.resetProduct(), this.abstractHandler('errorCreateProduct', ''))
            .catch(error => this.setState({ errorCreateProduct: error.response.data.error }));
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
                    {this.showErrors(this.state.errorToEdit)}
                    <div className="row">
                        <div className="col-12 col-md-4 col-md-auto mr-auto mb-4">
                            <button className="btn btn-primary col-12" onClick={() => this.handlerEdit()}>Editar </button>
                        </div>
                        <div className="col-12 col-md-4 col-md-auto mb-4">
                            <button className="btn btn-danger col-12" onClick={() => this.handlerDelete()}>Borrar </button>
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
        if(product === this.state.product_selected) {
            classN = 'rowSelected';
        }
        return (
            <tr className={"rowTable " + classN} key={id} onClick={() => this.abstractHandler('product_selected', product)}>
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
                <div className="row justify-content-around">
                    <div className="col-12 col-md-4 p-0 mb-3">
                        <label htmlFor="categoryChange" className="col-12 col-form-label">Seleccione una Categoria:</label>
                        <div className="col-12">
                            <select className="form-control" value={this.state.category_selected} onChange={this.handleChangeSelect}>
                                <option disabled="disabled" value="none">Elegir</option>
                                {this.createOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-0 mb-3">
                        <label htmlFor="categoryChange" className="col-12 col-form-label">Buscar por Codigo:</label>
                        <div className="col-12 mb-3">
                            <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Buscar Codigo" 
                                    onChange={event => this.abstractHandler('searchCode', event.target.value)} />
                        </div>
                        <div className="col-12">
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

    createXProductInput(title, id, placeholder, type, className) {
        return (
            <div className={"col-12 col-md-6 col-md-auto row pr-0 " + className}>
                <label htmlFor={id} className="col-md-2 col-form-label">{title}</label>
                <div className="col-md-9 mb-3 pr-0">
                    <input 
                        type={type}
                        className="form-control" 
                        id={id}
                        defaultValue={this.state.product[id]}
                        placeholder={placeholder}
                        onChange={event => this.abstractHandlerForAProduct(id, event.target.value)} />
                </div>
            </div>
        );
    }

    createOfferInput() {
        return (
            <div className="col-12 col-md-6 col-md-auto col-auto row pr-0 mb-3">
                <label htmlFor="offer" className="col-2 form-check-label">Oferta:</label>
                <div className="col-9 mb-3 pr-0 ">
                    <input 
                        type="checkbox"
                        checked={this.state.product.offer}
                        className="form-check-input"
                        id="offer"
                        onChange={event => this.abstractHandlerForAProduct('offer', event.target.checked)} />
                </div>
            </div>
        );
    }

    createCategoryProductInput() {
        return (
            <div className="col-12 col-md-6 col-md-auto row pr-0">
                <label className="col-md-2 col-form-label">Categoria:</label>
                <div className="col-md-9 mb-3 pr-0">
                    <select 
                        className="form-control"
                        defaultValue={this.state.product.category_id}
                        onChange={event => this.abstractHandlerForAProduct('category_id', event.target.value)}>
                        <option disabled="disabled" value="">Elegir</option>
                            {this.createOptions()}
                    </select>
                </div>
            </div>
        );
    }

    saveImage(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ image_selected: e.target.result });
        };
        reader.readAsDataURL(file);
    }

    showImage() {
        if (this.state.product.image_url === '') {
            return (
                <img src="https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png" className="rounded img-thumbnail img-fluid" width="250" height="200" />                
            );
        }
        return (
            <img src={this.state.product.image_url} className="rounded img-thumbnail img-fluid" width="250" height="200" />    
        );
    }

    createImageProductInput() {
        return (
            <div className="col-12 row d-flex justify-content-center">
                <div className="col-12 pr-0 d-flex justify-content-center">
                    {this.showImage()}    
                </div>
                <input type="file" name="photo" id="file" onChange={event => this.saveImage(event)}/>
                <label htmlFor="file" >Seleccione una Imagen</label>
            </div>
        );
    }

    createCropper() {
        if(this.state.image_selected !== '') {
            return (
                <Crop 
                    image_selected={this.state.image_selected} 
                    abstractHandlerForAProduct={this.abstractHandlerForAProduct}
                />
            );
        }
    }

    createPriceProductInput() {
        return (
            <div className="col-12 col-md-6 col-md-auto row pr-0 mr-auto">
                <label htmlFor="price" className="col-md-2 col-form-label">Precio:</label>
                <div className="col-md-9 mb-3 pr-0">
                    <input 
                        type="number"
                        className="form-control" 
                        id="price"
                        defaultValue={this.state.product.price}
                        placeholder="A partir de 0"
                        onChange={event => this.abstractHandlerForAProduct('price', event.target.value)} />
                </div>
            </div>
        );
    }

    createPriorityProductInput() {
        return (
            <div className="col-12 col-md-6 col-md-auto row pr-0">
                <label htmlFor="priority" className="col-md-2 col-form-label">Prioridad:</label>
                <div className="col-md-9 mb-3 pr-0">
                    <input 
                        type="number"
                        className="form-control" 
                        id="priority"
                        defaultValue={this.state.product.priority}
                        placeholder="A partir de 0"
                        onChange={event => this.abstractHandlerForAProduct('priority', event.target.value)} />
                </div>
            </div>
        );
    }

    createWrapperProductFrom() {
        return (
            <form className="col-xs-12 mb-4" onSubmit={e => { e.preventDefault(); }}>
                <span className="lines-style">Crear o Editar Producto</span>
                <div className="row">
                    {this.createCropper()}
                    {this.createImageProductInput()}
                    {this.createXProductInput('Titulo:', 'title', 'Ingrese un Titulo', 'text', 'mr-auto')}
                    {this.createXProductInput('Codigo:', 'code', 'Codigo del Producto', 'text')}
                    {this.createPriceProductInput()}
                    {this.createPriorityProductInput()}
                    {this.createXProductInput('Talle:', 'waist', 'Ingrese los Talles', 'text', 'mr-auto')}
                    {this.createCategoryProductInput()}
                    <div className="col-12 row pr-0">
                        <label htmlFor="description" className="col-md-1 col-form-label mr-3">Descripcion:</label>
                        <div className="col-md-10 mb-3 pr-0">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="description" 
                                defaultValue={this.state.product.description}
                                placeholder="Agregar una Descripcion"
                                onChange={event => this.abstractHandlerForAProduct('description', event.target.value)} />
                        </div>
                    </div>
                    {this.createOfferInput()}
                    <div className="col-12">
                        {this.showErrors(this.state.errorCreateProduct)}
                    </div>
                    <div className="col-12 row justify-content-around pr-0">
                        <div className="col-12 col-md-6 d-flex justify-content-end pr-0 mb-4">
                            <button 
                                className="col-12 col-md-6 btn btn-success"
                                onClick={() => this.createProduct()}
                                type="reset"
                                >
                                Crear
                            </button>
                        </div>
                        <div className="col-12 col-md-6 pr-0 mb-4">
                            <button type="reset" className="col-12 col-md-6 btn btn-primary" onClick={() => this.handlerEditProductSend()}>Aplicar</button>
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
