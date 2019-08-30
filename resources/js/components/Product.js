import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import '../../../public/css/product.css';
import Axios from 'axios';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                category_id: '',
                code: '',
                description: '',
                id: undefined,
                image_url: '',
                offer: 0,
                price: '',
                priority: '',
                title: '',
                waist: '',
            },
        };
    }

    componentWillMount() {
        Axios.get(`/api/product/${this.props.match.params.idProduct}`)
            .then(response => this.setState({ product: response.data.data }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div style={{ height: '450px', width:'450px' }}>
                        <img src={this.state.product.image_url} alt={this.state.product.description} className="img-fluid" style={{ width:'100%', height:'100%'}}/>
                    </div>
                    {this.state.product.title}
                </div>
                {this.state.product.code}
                {this.state.product.price}
                {this.state.product.waist}
                {this.state.product.description}
                {this.state.product.category_id}
            </div>
        );
    }
}


export default withRouter(Product)

if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}