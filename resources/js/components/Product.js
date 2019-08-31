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
                code: '',
                description: '',
                id: undefined,
                image_url: '',
                price: '',
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
            <div className="container mb-5">
                <div className="d-flex justify-content-center mb-3 mt-3">
                    <i class="fas fa-arrow-circle-left" style={{ fontSize:'78px', color:'#f6982e', cursor:'pointer', boxShadow: '0 5px 15px -5px #00000070', borderRadius: '50px'}} onClick={() => history.back()}></i>
                </div>
                <div className="row pt-5" style={{boxShadow: '0 5px 15px -5px #00000070'}}>
                    <div className="col-12 col-md-6 d-flex justify-content-center mb-5">
                        <div style={{ maxHeight: '500px', maxWidth:'450px'}}>
                            <img src={this.state.product.image_url} alt="" className="img-fluid" style={{ boxShadow: 'rgba(0, 0, 0, 0.44) 0px 5px 27px 1px'}}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <div style={{ color: '#e84393', fontSize:'49px'}}>{this.state.product.title}</div>
                        <div style={{ color: '#463219', fontSize:'18px'}}>{this.state.product.code}</div>
                        <div style={{ fontSize: '31px'}}>{this.state.product.price}$</div>
                        <div className="mt-1">Talle: {this.state.product.waist}</div>
                        <div className="mt-4 mb-3">{this.state.product.description}</div>
                        Cualquier consulta la puede realizar directamente por <a href="">WhatsApp</a> o por <a href="">Facebook</a> utilizando el codigo de la prenda
                        <div className="footer-icons d-flex justify-content-center mt-3 mb-3">
                            <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20saber%20de%20tus%20ofertas" target="_blank" className="icon-footer">
                                <i className="fab fa-whatsapp" style={{ color: '#72d69e', fontSize: '33px'}}></i>
                            </a>
                            <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="icon-footer"><i className="fab fa-facebook-f"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Product)

if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}