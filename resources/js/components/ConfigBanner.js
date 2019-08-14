import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ConfigBanner extends Component {

    constructor(props) {
        super(props);
        this.changeNewTitle = this.changeNewTitle.bind(this);
        this.createANewBanner = this.createANewBanner.bind(this);
        this.state = {
            banner: {
                title: '',
                products: [],
            },
            newTitle: '',
        };
    }

    componentDidMount() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error.response));
    }

    changeNewTitle(value) {
        this.setState({ newTitle: value});
    }

    createANewBanner() {
        axios.post('/api/banner', { title: this.state.newTitle }, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error.response.data));
    }

    firstBanner() {
        if(this.state.banner == '') {
            return (
                <div>
                    Eliga un Titulo para su Panel de Destacados:
                    <form>
                        <div className="form-row">
                            <div className="col">
                            <input type="text" className="form-control" placeholder="Escriba un nombre" onChange={event => this.changeNewTitle(event.target.value)} />
                            </div>
                            <div className="col">
                                <button type="reset" className="btn btn-success" onClick={() => this.createANewBanner()}>Crear</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        return undefined;
    }

    render() {
        return (
            <div className="container">
                {console.log(this.state.banner)}
                {this.firstBanner()}
                {/* {this.createEditNameInput()}
                {this.createProductTable()} */}
            </div>
        );
    }
}

if (document.getElementById('configBanner')) {
    ReactDOM.render(<ConfigBanner />, document.getElementById('configBanner'));
}