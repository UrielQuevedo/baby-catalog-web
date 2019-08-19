import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onZoomChange = this.onZoomChange.bind(this);
        this.state = {
            image: 'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg',
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
        };
    }

    onCropChange(crop) {
        this.setState({ crop })
    }
    
    onCropComplete(croppedArea, croppedAreaPixels){
        console.log(croppedArea, croppedAreaPixels)
    }
    
    onZoomChange(zoom) {
        this.setState({ zoom })
    }

    render() {
        return (
            <Cropper
                image={this.state.image}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
            />
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}