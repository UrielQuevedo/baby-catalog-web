import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../public/css/page.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
    <div
        className="slick-arrow slick-next d-none d-md-block col-md-12"
        style={{ ...style, display: "block"}}
        onClick={onClick}
      >
          <i class="fas fa-chevron-circle-right icon-carousel" style={{ color: 'rgb(115, 214, 159)', transform: 'translate(-1px, -59px)' }}></i>
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow slick-prev d-none d-md-block col-md-12"
        onClick={onClick}
      >
          <i class="fas fa-chevron-circle-left icon-carousel" style={{ color: 'rgb(115, 214, 159)', transform: 'translate(-16px,-59px)'}}></i>
      </div>
    );
  }

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: {
                title: '',
                products: [],
            },
            coverPageImage: {
                image_url: '',
            },
            isOffer: false,
            settings: {
                arrows: true,
                dots: true,
                speed: 500,
                infinite: true,
                slidesToShow: 4,
                initialSlide: 0,
                slidesToScroll: 4,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                pauseOnHover: true,
                responsive: [
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                    },
                    {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        initialSlide: 1
                    }
                    },
                    {
                        breakpoint: 590,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            initialSlide: 1
                        }
                        },
                    {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                    }
                ]
            }
        };
    }

    componentWillMount() {
        this.getBanner();
        this.isOffer();
        this.getCoverPageImage();
    }

    getCoverPageImage() {
        axios.get('/api/coverPage')
            .then(response => this.setState({ coverPageImage: response.data.data }))
            .catch(error => console.log(error.response.data.error));
        }

    isOffer() {
        axios.get('/api/product/thereIsAOffer')
            .then(response => this.setState({ isOffer: response.data.data }))
            .catch(error => console.log(error));
    }

    getBanner() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error));
    }

    showOfferTitle(product) {
        if(product.offer && product.offer_title !== null) {
            return (
                <div className="offer-content">
                    <span className="offer-title-carousel">{product.offer_title}</span>
                </div>
            );
        }
        return undefined;
    }

    showOfferPrice(product) {
        if(product.offer && product.offer_price !== null) {
            return (
                <div style={{ position: 'absolute'}}>
                    <div className="actual-price text-center col-6">
                        Ahora
                    </div>
                    <div className="product-price new-price">
                        {product.offer_price}$
                    </div>
                </div>
            );
        }
        return undefined;
    }

    showPrice(product) {
        if(product.offer && product.offer_price !== null) {
            return (
                <div className="col-6" style={{ marginBottom: '6px', marginTop: '4px' }}>
                    <span className="before-price">Antes</span>
                    <strike style={{ color: 'red' }}>
                        <span className="product-price">{product.price}$</span>
                    </strike>
                </div>
            );
        }
        return (
            <div className="col-12" style={{ textAlign: "center", marginBottom: '6px', marginTop: '4px' }}>
                <span className="product-price">{product.price}$</span>
            </div>
        );
    }

    showAllBannerProducts() {
        return this.state.banner.products.map((product, i) => (
            <div className="d-flex justify-content-center row">
                <div className="wrapper-image-carousel">
                    {this.showOfferTitle(product)}
                    <div className="imageBanner col-12 d-flex justify-content-center" style={{ minWidth:'225px', minHeight:'309px', marginTop: '40px' }}>
                        <Link to={`/product/${product.id}`}>
                            <img className="img-fluid rounded image-product" src={product.image_url} style={{ height:'100%'}} alt={product.description} />
                            <div className="middle">
                                <span>
                                    <span className="icon-search">VER</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <span style={{ fontSize: '22px', color:'rgb(33, 150, 244)' }}>{product.title}</span>
                    </div>
                    {this.showOfferPrice(product)}
                    {this.showPrice(product)}
                </div>
            </div>
        ));
    }

    createBannerOffer() {
        if (this.state.isOffer) {
            return (
                <div className="container text-center bannerOffer">
                    <div className="textOffer">
                        No te podes perder las promociones exclusivas que tenemos en estas prendas para vos!
                    </div>
                    <a href="/catalogue/offers">
                        <button className="button-view buttonOffer">
                            PROMOCIONES
                        </button>
                    </a>
                </div>
            );
        }
        return undefined;
    }

    render() {
        return (
            <div className="box">
                <div className="container p-0"  style={{ marginTop: '50px', boxShadow: '0 5px 15px -5px #00000070', maxWidth: '959px', maxHeight:'383.6px' }}>
                    <a href="/catalogue">
                        <img   
                            src={this.state.coverPageImage.image_url}
                            alt="Imagen de Portada Nala" 
                            className="img-fluid" 
                            style={{ width: '100%', height: '100%', cursor: 'pointer'}}
                        />
                    </a>
                </div>
                <div className="container-fluid">
                    <div className="justify-content-center" style={{ marginTop: '50px' }}>
                        <h1 class="ribbon">
                            <strong class="ribbon-content">{this.state.banner.title}</strong>
                        </h1>
                    </div>
                    <div className="social-bar">
                        <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20realizar%20una%20consulta" target="_blank" className="icon-social" style={{ background: '#25d366'}}><i className="fab fa-whatsapp"></i></a>
                        <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="icon-social instagram" ><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="icon-social" style={{ background: '#2E406E'}}><i className="fab fa-facebook-square"></i></a>
                    </div>
                    <div className="container mb-5">
                        <Slider {...this.state.settings}>
                            {this.showAllBannerProducts()}
                        </Slider>
                        <div className="d-flex justify-content-center mt-5">
                            <a href="/catalogue">
                                <button className="button-view">
                                    CATALOGO
                                </button>
                            </a>
                        </div>
                    </div>
                    {this.createBannerOffer()}
                </div>
            </div>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}