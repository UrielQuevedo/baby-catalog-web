import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
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
          <i class="fas fa-chevron-circle-right" style={{ color: 'rgb(115, 214, 159)', fontSize: '40px', transform: 'translate(-20px, -59px)' }}></i>
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
          <i class="fas fa-chevron-circle-left" style={{ color: 'rgb(115, 214, 159)', fontSize: '40px', transform: 'translate(-16px,-59px)'}}></i>
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
        this.getBanner()
    }

    getBanner() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error));
    }

    showAllBannerProducts() {
        return this.state.banner.products.map((product, i) => (
            <div className="d-flex justify-content-center row">
                <div className="imageBanner col-12 d-flex justify-content-center">
                    <img className="img-fluid rounded image-product" src={product.image_url} style={{ height:'100%'}} alt={product.description} />
                    <div className="middle">
                        <span style={{ fontSize: '20px' }}>
                            VER
                        </span>
                    </div>
                </div>
                <div className="col-12" style={{ textAlign: "center" }}>
                    <span style={{ fontSize: '22px', color:'rgb(33, 150, 244)' }}>{product.title}</span>
                </div>
                <div className="col-12" style={{ textAlign: "center" }}>
                    <span style={{ fontSize: '16px' }}>{product.price}$</span>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="box">
                <div className="container"  style={{ marginTop: '50px', boxShadow: '0 5px 15px -5px #00000070' }}>
                    <img src="https://tienda.pachibebes.com/image/catalog/banners_home/ecommerceInv2019-23.jpg" alt="" className="img-fluid"/>
                </div>
                <div className="container-fluid">
                    <div className="justify-content-center" style={{ marginTop: '50px' }}>
                        <h1 className="ribbon">
                            <strong className="ribbon-content">{this.state.banner.title}</strong>
                        </h1>
                    </div>
                    <div className="social-bar">
                        <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20saber%20de%20tus%20ofertas" target="_blank" className="icon-social" style={{ background: '#25d366'}}><i className="fab fa-whatsapp"></i></a>
                        <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="icon-social instagram" ><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="icon-social" style={{ background: '#2E406E'}}><i className="fab fa-facebook-square"></i></a>
                    </div>
                    <div className="container mb-5">
                        <Slider {...this.state.settings}>
                            {this.showAllBannerProducts()}
                        </Slider>
                        <div className="d-flex justify-content-center mt-5">
                            <button className="button-view">
                                VER MAS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}