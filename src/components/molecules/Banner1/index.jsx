import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-bootstrap'; 
import './Banner1.css';


function Banner1() {
  return (
    <Carousel >
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./cat-5778777_1920.jpg')}  alt="First slide" />
        <Carousel.Caption>
          
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Cat Accesories</h3> 
          <p id="p1">Dog toys provide both physical and mental stimulation, as well as preventing destructive behaviour and encouraging relaxation</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./pexels-snapwire-46024 (1).jpg')}  alt="Second slide" />
        <Carousel.Caption>
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Cat Food</h3>
          <p id="p1">We have put together some exciting kitten accessories that make your cat's schedule more fun and keep maintenance easy.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./pexels-zhang-kaiyv-7149465.jpg')}  alt="Third slide" />
        <Carousel.Caption>
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Cat Toys</h3>
          <p id="p1">
          Birds love to destroy things. Appropriate chewable objects include untreated wood blocks, branches, pinecones, rawhide, natural fiber rope, cloth, and soft pine.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner1;