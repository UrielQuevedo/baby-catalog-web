import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ConfigCategory extends Component {

    constructor(props) {
        super(props);
        this.handlerCategoryName = this.handlerCategoryName.bind(this);
        this.state = {
            category_name: '',
            categories: [],
        };
    }

    componentDidMount() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    handlerCategoryName(value) {
        this.setState({ category_name: value });
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
                            onChange={ event => this.handlerCategoryName(event.target.value) }
                        />
                    </div>
                    <button type="reset" className="col-md-3 btn btn-primary" onClick={() => this.createCategory()}>Crear Categoria</button>
                </div>
            </form>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                {this.createCategoryForm()}
            </div>
        );
    }
}

if (document.getElementById('configCategory')) {
    ReactDOM.render(<ConfigCategory />, document.getElementById('configCategory'));
}