import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'react-bootstrap';
import v from '../../styles/variables';
import 'bootstrap/dist/css/bootstrap.min.css';

const SliderDash = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: <button className="slick-prev">Previous</button>, 
        nextArrow: <button className="slick-next">Next</button>
    };

    return (
        <div style={{ overflow: 'hidden', height: '100vh' }}> {/* Establece el alto del contenedor */}
            <div className='w-39 mt-5 d-flex justify-content-end'>
                <Button variant="primary" className='w-28 h-14 rounded-lg mx-2' style={{ backgroundColor: '#008000', color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <Link to='/login' className='text-white text-decoration-none'>Login</Link>
                </Button>
                <Button variant="primary" className='w-28 h-14 rounded-lg mx-2' style={{ backgroundColor: '#008000', color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <Link to='/registro' className='text-white text-decoration-none'>Registro</Link>
                </Button>
            </div>
            
            <Slider {...settings} style={{ width: '100%', height: '100%' }}> {/* Establece el estilo del Slider */}
                <div>
                    <img src={v.ImgSlider1} alt="Imagen 1" style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
                </div>
                <div>
                    <img src={v.ImgSlider2} alt="Imagen 2" style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
                </div>
                <div>
                    <img src={v.ImgSlider3} alt="Imagen 3" style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
                </div>
                {/* Agrega las demás imágenes aquí utilizando las variables exportadas */}
            </Slider>
        </div>
    );
};

export default SliderDash;
