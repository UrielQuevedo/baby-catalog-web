import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ConfigCategory extends Component {

    constructor(props) {
        super(props);
        this.abstractHandler = this.abstractHandler.bind(this);
        this.handlerCategorySelected = this.handlerCategorySelected.bind(this);
        this.state = {
            selected_category: undefined,
            category_name: '',
            category_edit: '',
            categories: [],
        };
    }

    componentDidMount() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    abstractHandler(property, value) {
        this.setState({ [property]: value } );
    }

    handlerCategorySelected(value) {
        this.setState({ selected_category: value });
    }

    addCategory(category) {
        const prevCategories = this.state.categories;
        this.setState({ categories: [...prevCategories, category] });
    }

    createCategory() {
        axios.post('/api/category', { category_name: this.state.category_name }, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
        .then(response => this.addCategory(response.data.data))
        .catch(error => console.log(error.response.data));
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
                <select className="form-control" size="5" id="categorySelector" onChange={event => this.handlerCategorySelected(event.target.value)}>
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
                            onChange={ event => this.abstractHandler('category_name', event.target.value) }
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="reset" className="btn btn-primary col-12" onClick={() => this.createCategory()}>Crear Categoria</button>
                    </div>
                </div>
            </form>
            </div>
        );
    }

    changeCategory() {
        axios.put(`/api/category/${this.state.selected_category}`, { category_name: this.state.category_edit }, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
        .then(response => this.setState({ categories: response.data.data }))
        .catch(error => console.log(error.response.data));
    }

    createEditCategoryForm() {
        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="categoryChange" className="col-md-3 col-form-label">Cambiar el nombre:</label>
                    <div className="col-md-6">
                        <input type="text" 
                            className="form-control"
                            placeholder="Eliga un nuevo nombre"
                            id="categoryChange" 
                            onChange={event => this.abstractHandler('category_edit', event.target.value) }
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="reset" className="btn btn-primary col-12" onClick={() => this.changeCategory()}>Aplicar Cambios</button>
                        <button type="reset" className="btn btn-danger col-12" onClick={() => this.borrarCategoria()}>Borrar Categoria</button>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                {this.createCategoryForm()}
                {this.createEditCategoryForm()}
            </div>
        );
    }
}

if (document.getElementById('configCategory')) {
    ReactDOM.render(<ConfigCategory />, document.getElementById('configCategory'));
}