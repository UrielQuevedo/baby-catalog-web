import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Crop from '../components/Crop';

export default class ConfigCoverPageImage extends Component {

    constructor(props) {
        super(props);
        this.saveImage = this.saveImage.bind(this);
        this.createCoverPageImage = this.createCoverPageImage.bind(this);
        this.editCoverPageImage = this.editCoverPageImage.bind(this);
        this.state = {
            coverPageImage: {
                id: undefined,
                image_url: '',
                image_id: '',
            },
            error: '',
        };
    }

    componentDidMount() {
        this.getCoverPageImage();
    }

    ifNotExist(data) {
        if (data !== '') {
            this.setState({ coverPageImage: data });
        }
    }

    getCoverPageImage() {
        axios.get('/api/coverPage')
            .then(response => this.ifNotExist(response.data.data))
            .catch(error => console.log(error.response.data));
    }

    showImageIfExist() {
        if (this.state.coverPageImage.image_url === '') {
            return (
                <div className="alert alert-primary col-12 text-center" role="alert">
                    No hay una imagen de Portada Cargada aún.
                </div>
            );
        }
        return (
            <div className="mb-5">
                <img src={this.state.coverPageImage.image_url} alt="Imagen de Portada de Nala Kids" className="img-fluid"/>
            </div>
        );
    }

    saveImage(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        let prevCoverPageImage = this.state.coverPageImage;
        reader.onload = (e) => {
            this.setState({ coverPageImage: { ...prevCoverPageImage, image_url: e.target.result } });
        };
        reader.readAsDataURL(file);
    }

    createCoverPageImage() {
        axios.post('/api/coverPage', this.state.coverPageImage, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.setState({ coverPageImage: response.data.data, error: '' }))
            .catch(error => this.setState({ error: error.response.data.error }));
    }

    editCoverPageImage() {
        axios.put(`/api/coverPage/${this.state.coverPageImage.id}`, this.state.coverPageImage, { 
            headers: {
                "Authorization" : `Bearer ${this.props.location.state.token}`,
            } 
        })
            .then(response => this.setState({ coverPageImage: response.data.data, error: '' }))
            .catch(error => this.setState({ error: error.response.data.error }));
    }

    createButton() {
        if (this.state.coverPageImage.image_id === '') {
            return (
                <div className="col-12 col-md-6 pr-0 mb-4">
                    <button className="col-12 col-md-6 btn btn-success" type="button" onClick={() => this.createCoverPageImage()}>Crear</button>
                </div>
            );
        }
        return (
            <div className="col-12 col-md-6 pr-0 mb-4">
                <button className="col-12 col-md-6 btn btn-success" type="button" onClick={() => this.editCoverPageImage()}>Aceptar</button>
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

    render() {
        return (
            <div className="container">
                <form className="col-xs-12 mb-4" onSubmit={e => { e.preventDefault(); }}>
                    <span className="lines-style">Imagen de Portada</span>
                    <div className="row">
                        {this.showImageIfExist()}
                        <div className="col-12 row justify-content-around pr-0">
                            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end pr-0 mb-4">
                                <input type="file" name="photo" id="file" onChange={event => this.saveImage(event)}/>
                                <label htmlFor="file" >Seleccione una Imagen</label>
                            </div>
                            {this.createButton()}
                        </div>
                        {this.showErrors(this.state.error)}
                    </div>
                </form>
            </div>
        );
    }
}

if (document.getElementById('configCoverPageImage')) {
    ReactDOM.render(<ConfigCoverPageImage />, document.getElementById('configCoverPageImage'));
}
