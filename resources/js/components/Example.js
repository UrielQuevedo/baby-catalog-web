import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { runInThisContext } from 'vm';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
            categories: [],
        };
    }

    componentDidMount() {
        this.giveAllCategories();
    }

    giveAllCategories() {
        axios.get('api/category')
            .then(response => this.setState({ categories: response.data.data }));
    }

    handlerCategoryName(event) {
        this.setState({ category_name: event.target.value });
    }

    createCategory() {
        axios.post('api/category', { category_name: this.state.category_name });
    }

    createCategoryOptionsTable() {
        if (this.state.categories !== []) {
            return this.state.categories.map(category => (
                <option key={category.id} value={category.id}>{category.category_name}</option>
            ));
        }
    }

    render() {
        return (
            <div className="container">
                Administracion
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
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
