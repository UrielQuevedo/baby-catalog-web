import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { runInThisContext } from 'vm';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
        };
    }

    handlerCategoryName(event) {
        this.setState({ category_name: event.target.value });
    }

    createCategory() {
        axios.post('api/category', { category_name: this.state.category_name });
    }

    render() {
        return (
            <div className="container">
                Administracion
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
