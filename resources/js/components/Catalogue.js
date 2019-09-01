import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../../../public/css/catalogue.css';


class Catalogue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products_category: [],
        };
    }

    componentDidMount() {
        this.getAllCategories();
        this.getProductsByCategory();
    }

    getAllCategories() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data.data }))
            .catch(error => console.log(error.response.data))
    }

    getProductsByCategory() {
        axios.get(`/api/product/byCategory/${this.props.match.params.idCategory}`)
            .then( response => this.setState({ products_category: response.data.data }))
            .catch( error => console.log(error.response.data));
    }

    isActiveCategory(id) {
        return this.props.match.params.idCategory == id ? 'active-category' : '';
    }

    createCategoryMenu() {
        return this.state.categories.map( category => (
                <a href={`/catalogue/${category.id}`}>
                    <div className={`mt-3 mb-3 ${this.isActiveCategory(category.id)} category-menu`}>
                        {category.category_name}
                    </div>
                </a>
        ));
    }

    createProducts() {
        if(this.state.products_category.length === 0) {
            return (
                <div className="col align-self-center justify-content-center d-flex mb-5 notProducts">No tenemos ningun producto cargado aún.</div>
            );
        }
        return this.state.products_category.map( product => (
            <div className="text-center pr-0 mb-5 mr-3 ml-4">
                <Link to={`/product/${product.id}`}>
                    <div className="container-product-catalogue pt-5">
                        <div className="carousel-product-ribbon ribbon-1">{product.title_offer}</div>
                        <div className="container image-container-product" style={{ height: '300px', width: '300px'}}>
                            <img src={product.image_url} alt="" className="img-fluid rounded image-product" style={{ width:'100%', height:'100%'}} />
                        </div>
                        <h4 className="title-card-product">
                            {product.title}
                        </h4>
                        <div>
                            <hr data-hook="product-item-line-between-name-and-price" class="linear" aria-hidden="true" />
                        </div>
                        <span style={{ fontSize: '18px'}}>{product.price}$</span>
                    </div>
                </Link>
            </div>
        ));
    }

    render() {
        return (
            <div className="container-fluid" >
                {console.log(this.state.products_category)}
                <div className="d-flex justify-content-center mb-5 mt-5">
                    <h1> <span style={{ color: '#e84393', fontSize: '54px' }}>CATALOGO</span></h1>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-2 text-center">
                        <div className="wrapper-categories mb-5">
                            <h3 className="pt-4" style={{ fontSize: '34px' }}>Categorias</h3>
                            <div className="mt-4 pb-4">
                                {this.createCategoryMenu()}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-10 pr-0 mr-0 row d-flex justify-content-center">
                        {this.createProducts()}
                    </div>
                </div>
                <i class="fas fa-chevron-circle-up icon-up d-lg-none" onClick={() => window.scroll({top:140, left:0, behavior: 'smooth'})}></i>
                <div className="social-bar">
                    <a href="https://wa.me/5491162743761?text=Hola%20Nala%20queria%20realizar%20una%20consulta" target="_blank" className="icon-social" style={{ background: '#25d366'}}><i className="fab fa-whatsapp"></i></a>
                    <a href="https://www.instagram.com/nalaquilmes/?fbclid=IwAR3Zy-k9ihYTBbi3DurzfMn8s_xQGcYcIZ0HOJ68knEjGVg4xVWybmd4kik" target="_blank" className="icon-social instagram" ><i className="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/Nala-Quilmes-1096349540445839/?ref=br_rs" target="_blank" className="icon-social" style={{ background: '#2E406E'}}><i className="fab fa-facebook-square"></i></a>
                </div>
            </div>
        );
    }
}

export default withRouter(Catalogue)

if (document.getElementById('catalogue')) {
    ReactDOM.render(<Catalogue />, document.getElementById('catalogue'));
}