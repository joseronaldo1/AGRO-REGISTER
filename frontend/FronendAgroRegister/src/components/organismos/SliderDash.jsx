import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import v from '../../styles/variables';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Services';
import '../../styles/Slader.css';

const SliderDash = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <button className="slick-prev">Previous</button>, 
        nextArrow: <button className="slick-next">Next</button>
    };

    return (
        <div className="container-fluid">
            <div>
                <Slider {...settings} style={{ marginTop: '110px'}}> {/* Añade un espacio arriba del slider */}
                    <div>
                        <img src={v.ImgSlider1} alt="Imagen 1" style={{ borderRadius:"30px", width: '100%', objectFit: 'cover', border:'none', height: '800px' }} />
                    </div>
                    <div>
                        <img src={v.ImgSlider2} alt="Imagen 2" style={{  borderRadius:"30px", width: '100%', objectFit: 'cover', border:'none', height: '800px' }} />
                    </div>
                    <div>
                        <img src={v.ImgSlider3} alt="Imagen 3" style={{  borderRadius:"30px", width: '100%', objectFit: 'cover', border:'none', height: '800px' }} />
                    </div>
                    <div>
                        <img src={v.image7} alt="Imagen 4" style={{   borderRadius:"30px", width: '100%', objectFit: 'cover', border:'none', height: '800px' }} />
                    </div>
                    {/* Agrega las demás imágenes aquí utilizando las variables exportadas */}
                </Slider>
                <Services/>
            </div>
        </div>
    );
};

export default SliderDash;