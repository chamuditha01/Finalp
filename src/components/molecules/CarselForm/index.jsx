
import React from 'react';
import Slider from 'react-slick';
import Form1 from '../../atoms/Form1';
import Form2 from '../../atoms/Form2';

const CarouselForm = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Form1 />
        </div>
        <div>
          <Form2 />
        </div>
        
      </Slider>
    </div>
  );
};

export default CarouselForm;
