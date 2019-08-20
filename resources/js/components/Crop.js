import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CroppedImage';
import '../../../public/css/configBanner.css';
import axios from 'axios';

export default class Crop extends Component {

    constructor(props) {
        super(props);
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onZoomChange = this.onZoomChange.bind(this);
        this.showCroppedImage = this.showCroppedImage.bind(this);
        this.state = {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 3.9 / 4,
            croppedAreaPixels: null,
            croppedImage: null,
        };
    }

    onCropChange(crop) {
        this.setState({ crop })
    }
    
    onCropComplete(croppedArea, croppedAreaPixels){
        this.setState({ croppedAreaPixels });
    }
    
    onZoomChange(zoom) {
        this.setState({ zoom })
    }

    async showCroppedImage() {
        const croppedImage = await getCroppedImg(
            this.props.image_selected,
            this.state.croppedAreaPixels
        )
        this.props.abstractHandlerForAProduct('image_url',croppedImage);
    }

    render() {
        return (
            <div className="col-12">
                <div className="cropContainerImage mb-4">
                    <div className="crop-container">
                        <Cropper
                            image={this.props.image_selected}
                            crop={this.state.crop}
                            zoom={this.state.zoom}
                            aspect={this.state.aspect}
                            onCropChange={this.onCropChange}
                            onCropComplete={this.onCropComplete}
                            onZoomChange={this.onZoomChange}
                        />
                    </div>
                </div>
                <div className="container">
                    <label htmlFor="customRange2">Zoom</label>
                    <input defaultValue={this.state.zoom} type="range" className="custom-range" min="1" max="3" step="0.1" id="customRange2" onChange={(e) => this.onZoomChange(e.target.value)} />
                        <button className="btn btn-primary mb-2 mt-2" onClick={this.showCroppedImage}>
                            Cortar
                        </button>
                </div>
            </div>
        );
    }
}

if (document.getElementById('crop')) {
    ReactDOM.render(<Crop />, document.getElementById('crop'));
}