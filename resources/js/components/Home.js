import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../../public/css/page.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: '',
        };
    }

    componentWillMount() {
        this.getBanner()
    }

    getBanner() {
        axios.get('/api/banner')
            .then(response => this.setState({ banner: response.data.data }))
            .catch(error => console.log(error.response.data.error));
    }


    render() {
        return (
            <div className="box">
                {console.log(this.state.banner)}
                <div className="row d-flex justify-content-center mr-0 banner">
                    <img src="https://res.cloudinary.com/dddzzcrzg/image/upload/v1566572950/NalaTitle_owkurc.png" />
                </div>
                <nav className="header">
                    <div className="icons ml-4">
                        <i className="fab fa-whatsapp mr-4"></i>
                        <i className="fab fa-instagram mr-4"></i>
                        <i className="fab fa-facebook"></i>
                    </div>
                    <input type="checkbox" id="chk" />
                    <label htmlFor="chk" className="show-menu-btn">
                        <i className="fas fa-bars"></i>
                    </label>

                    <ul className="menu">
                        <a href="#"> Inicio </a>
                        <a href="#"> Catalogo </a>
                        <a href="#"> Contacto </a>
                        <a href="#"> Sucursal </a>
                        <label htmlFor="chk" className="hide-menu-btn">
                            <i className="fas fa-times"></i>
                        </label>
                    </ul>
                </nav>
                <div className="container-fluid">
                    <div className="justify-content-center">
                        <h1 className="ribbon">
                            <strong className="ribbon-content">{this.state.banner.title}</strong>
                        </h1>
                    </div>
                    <div className="social-bar">
                        <a href="#" target="_blank" className="icon-social" style={{ background: '#25d366'}}><i className="fab fa-whatsapp"></i></a>
                        <a href="#" target="_blank" className="icon-social instagram" ><i className="fab fa-instagram"></i></a>
                        <a href="#" target="_blank" className="icon-social" style={{ background: '#2E406E'}}><i className="fab fa-facebook-square"></i></a>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dolor velit, pellentesque vitae eleifend at, tincidunt vehicula augue. Donec ultricies sollicitudin pellentesque. Fusce in molestie dui. Quisque aliquet vestibulum eros eget interdum. Suspendisse sollicitudin venenatis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer cursus ligula purus, eget faucibus orci rhoncus nec. Morbi egestas enim tincidunt, commodo nibh ut, molestie dolor. Duis accumsan eros ut ornare volutpat. Nam tincidunt, purus id placerat posuere, tellus massa malesuada est, at interdum ligula tellus at augue. Ut lectus sapien, accumsan a maximus eu, accumsan id tortor. Quisque blandit leo ac nunc pretium lobortis. Praesent at enim in diam finibus aliquet et sed purus. Aenean sodales, mi sed aliquet ultricies, leo odio accumsan nisl, non dignissim neque enim nec purus. Donec vitae ultricies ligula. Duis iaculis porttitor turpis ut efficitur.

                    Donec interdum nulla non sollicitudin consectetur. Phasellus maximus ante vel mi tempor, eu aliquam nulla consectetur. Vivamus elit nulla, imperdiet a purus vel, dictum aliquam diam. Suspendisse potenti. Fusce iaculis posuere quam at bibendum. Morbi ullamcorper turpis in tortor varius, at vestibulum nisi lobortis. Vestibulum sodales lorem ac nulla tristique pretium. Integer eu efficitur tortor. Suspendisse potenti. Quisque facilisis porttitor nibh. Quisque vel tellus id mi accumsan auctor. Vestibulum et urna vitae tortor euismod bibendum. In ac cursus mauris.

                    Donec et odio neque. Donec dictum scelerisque tellus, nec vestibulum purus rhoncus ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris et justo dictum, fermentum lorem ac, fringilla arcu. Fusce euismod arcu quis magna faucibus congue. In efficitur odio magna, quis auctor arcu consequat quis. Sed ullamcorper elementum orci eget tincidunt. Mauris a magna non purus congue maximus. Nam at eros arcu. Nullam commodo quis velit et blandit. Donec tempus posuere arcu, eget ullamcorper justo. Nam pretium feugiat accumsan. Proin sollicitudin auctor sapien, at vestibulum risus cursus at. Pellentesque magna nisl, convallis a lectus at, efficitur commodo nibh. Nunc nec ullamcorper purus, ac sagittis ante.

                    Morbi quam orci, mollis vel dolor eu, volutpat rutrum elit. Maecenas faucibus leo finibus sem tristique pretium. Proin sed semper arcu. Vivamus pulvinar urna tellus. Suspendisse semper tortor ut rhoncus ullamcorper. Donec semper mauris in mi ornare scelerisque. Etiam scelerisque dolor vitae massa semper condimentum. Integer sem nunc, ultrices vulputate lorem egestas, placerat luctus eros. Vivamus semper sollicitudin ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique, massa non rutrum semper, arcu arcu consequat ex, sed facilisis ante odio sed tortor.

                    Nullam bibendum massa a ligula viverra cursus. Etiam lectus arcu, molestie in ullamcorper in, vulputate in elit. Aliquam sed odio dapibus, posuere lacus quis, porttitor erat. Pellentesque feugiat, orci eu auctor luctus, enim lectus auctor tortor, a vehicula ligula lectus et metus. Donec quis ex ligula. Etiam auctor laoreet sem vel viverra. Morbi id commodo justo, quis vestibulum mi. Pellentesque non urna ex. Sed vitae ultricies arcu, sed malesuada purus. Morbi sit amet mauris nulla. Quisque sit amet nunc dui.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dolor velit, pellentesque vitae eleifend at, tincidunt vehicula augue. Donec ultricies sollicitudin pellentesque. Fusce in molestie dui. Quisque aliquet vestibulum eros eget interdum. Suspendisse sollicitudin venenatis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer cursus ligula purus, eget faucibus orci rhoncus nec. Morbi egestas enim tincidunt, commodo nibh ut, molestie dolor. Duis accumsan eros ut ornare volutpat. Nam tincidunt, purus id placerat posuere, tellus massa malesuada est, at interdum ligula tellus at augue. Ut lectus sapien, accumsan a maximus eu, accumsan id tortor. Quisque blandit leo ac nunc pretium lobortis. Praesent at enim in diam finibus aliquet et sed purus. Aenean sodales, mi sed aliquet ultricies, leo odio accumsan nisl, non dignissim neque enim nec purus. Donec vitae ultricies ligula. Duis iaculis porttitor turpis ut efficitur.

                    Donec interdum nulla non sollicitudin consectetur. Phasellus maximus ante vel mi tempor, eu aliquam nulla consectetur. Vivamus elit nulla, imperdiet a purus vel, dictum aliquam diam. Suspendisse potenti. Fusce iaculis posuere quam at bibendum. Morbi ullamcorper turpis in tortor varius, at vestibulum nisi lobortis. Vestibulum sodales lorem ac nulla tristique pretium. Integer eu efficitur tortor. Suspendisse potenti. Quisque facilisis porttitor nibh. Quisque vel tellus id mi accumsan auctor. Vestibulum et urna vitae tortor euismod bibendum. In ac cursus mauris.

                    Donec et odio neque. Donec dictum scelerisque tellus, nec vestibulum purus rhoncus ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris et justo dictum, fermentum lorem ac, fringilla arcu. Fusce euismod arcu quis magna faucibus congue. In efficitur odio magna, quis auctor arcu consequat quis. Sed ullamcorper elementum orci eget tincidunt. Mauris a magna non purus congue maximus. Nam at eros arcu. Nullam commodo quis velit et blandit. Donec tempus posuere arcu, eget ullamcorper justo. Nam pretium feugiat accumsan. Proin sollicitudin auctor sapien, at vestibulum risus cursus at. Pellentesque magna nisl, convallis a lectus at, efficitur commodo nibh. Nunc nec ullamcorper purus, ac sagittis ante.

                    Morbi quam orci, mollis vel dolor eu, volutpat rutrum elit. Maecenas faucibus leo finibus sem tristique pretium. Proin sed semper arcu. Vivamus pulvinar urna tellus. Suspendisse semper tortor ut rhoncus ullamcorper. Donec semper mauris in mi ornare scelerisque. Etiam scelerisque dolor vitae massa semper condimentum. Integer sem nunc, ultrices vulputate lorem egestas, placerat luctus eros. Vivamus semper sollicitudin ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique, massa non rutrum semper, arcu arcu consequat ex, sed facilisis ante odio sed tortor.

                    Nullam bibendum massa a ligula viverra cursus. Etiam lectus arcu, molestie in ullamcorper in, vulputate in elit. Aliquam sed odio dapibus, posuere lacus quis, porttitor erat. Pellentesque feugiat, orci eu auctor luctus, enim lectus auctor tortor, a vehicula ligula lectus et metus. Donec quis ex ligula. Etiam auctor laoreet sem vel viverra. Morbi id commodo justo, quis vestibulum mi. Pellentesque non urna ex. Sed vitae ultricies arcu, sed malesuada purus. Morbi sit amet mauris nulla. Quisque sit amet nunc dui.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dolor velit, pellentesque vitae eleifend at, tincidunt vehicula augue. Donec ultricies sollicitudin pellentesque. Fusce in molestie dui. Quisque aliquet vestibulum eros eget interdum. Suspendisse sollicitudin venenatis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer cursus ligula purus, eget faucibus orci rhoncus nec. Morbi egestas enim tincidunt, commodo nibh ut, molestie dolor. Duis accumsan eros ut ornare volutpat. Nam tincidunt, purus id placerat posuere, tellus massa malesuada est, at interdum ligula tellus at augue. Ut lectus sapien, accumsan a maximus eu, accumsan id tortor. Quisque blandit leo ac nunc pretium lobortis. Praesent at enim in diam finibus aliquet et sed purus. Aenean sodales, mi sed aliquet ultricies, leo odio accumsan nisl, non dignissim neque enim nec purus. Donec vitae ultricies ligula. Duis iaculis porttitor turpis ut efficitur.

                    Donec interdum nulla non sollicitudin consectetur. Phasellus maximus ante vel mi tempor, eu aliquam nulla consectetur. Vivamus elit nulla, imperdiet a purus vel, dictum aliquam diam. Suspendisse potenti. Fusce iaculis posuere quam at bibendum. Morbi ullamcorper turpis in tortor varius, at vestibulum nisi lobortis. Vestibulum sodales lorem ac nulla tristique pretium. Integer eu efficitur tortor. Suspendisse potenti. Quisque facilisis porttitor nibh. Quisque vel tellus id mi accumsan auctor. Vestibulum et urna vitae tortor euismod bibendum. In ac cursus mauris.

                    Donec et odio neque. Donec dictum scelerisque tellus, nec vestibulum purus rhoncus ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris et justo dictum, fermentum lorem ac, fringilla arcu. Fusce euismod arcu quis magna faucibus congue. In efficitur odio magna, quis auctor arcu consequat quis. Sed ullamcorper elementum orci eget tincidunt. Mauris a magna non purus congue maximus. Nam at eros arcu. Nullam commodo quis velit et blandit. Donec tempus posuere arcu, eget ullamcorper justo. Nam pretium feugiat accumsan. Proin sollicitudin auctor sapien, at vestibulum risus cursus at. Pellentesque magna nisl, convallis a lectus at, efficitur commodo nibh. Nunc nec ullamcorper purus, ac sagittis ante.

                    Morbi quam orci, mollis vel dolor eu, volutpat rutrum elit. Maecenas faucibus leo finibus sem tristique pretium. Proin sed semper arcu. Vivamus pulvinar urna tellus. Suspendisse semper tortor ut rhoncus ullamcorper. Donec semper mauris in mi ornare scelerisque. Etiam scelerisque dolor vitae massa semper condimentum. Integer sem nunc, ultrices vulputate lorem egestas, placerat luctus eros. Vivamus semper sollicitudin ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique, massa non rutrum semper, arcu arcu consequat ex, sed facilisis ante odio sed tortor.

                    Nullam bibendum massa a ligula viverra cursus. Etiam lectus arcu, molestie in ullamcorper in, vulputate in elit. Aliquam sed odio dapibus, posuere lacus quis, porttitor erat. Pellentesque feugiat, orci eu auctor luctus, enim lectus auctor tortor, a vehicula ligula lectus et metus. Donec quis ex ligula. Etiam auctor laoreet sem vel viverra. Morbi id commodo justo, quis vestibulum mi. Pellentesque non urna ex. Sed vitae ultricies arcu, sed malesuada purus. Morbi sit amet mauris nulla. Quisque sit amet nunc dui.

                </div>
            </div>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}