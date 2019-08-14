import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

    createProductTable() {
        return (
            <div>
                Hello
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
                {this.createProductTable()}
            </div>
        );
    }
}

if (document.getElementById('configBanner')) {
    ReactDOM.render(<ConfigBanner />, document.getElementById('configBanner'));
}