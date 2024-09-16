import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slide.scss';

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
    const settings = {
        slidesToShow: slidesToShow || 1,
        slidesToScroll: arrowsScroll || 1,
        dots: true,
        infinite: true,
        speed: 900,
        arrows: true,
    };

    return (
        <div className="relative flex justify-center pb-24">
            <div className="w-full max-w-7xl">
                <Slider {...settings}>
                    {children}
                </Slider>
            </div>
        </div>
    );
};

export default Slide;
