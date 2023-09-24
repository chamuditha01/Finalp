import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-bootstrap'; 
import './Banner2.css';


function Banner2() {
  return (
    <Carousel >
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./animal-4118585_1920.jpg')}  alt="First slide" />
        <Carousel.Caption>
          
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Dog Accesories</h3> 
          <p id="p2">Dog toys provide both physical and mental stimulation, as well as preventing destructive behaviour and encouraging relaxation</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./dog-3277416_1920.jpg')}  alt="Second slide" />
        <Carousel.Caption>
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Dog Food</h3>
          <p id="p1">We have put together some exciting kitten accessories that make your cat's schedule more fun and keep maintenance easy.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      
        <img style={{height: '500px',opacity:'0.9',objectFit:'cover'}} src={require('./puppy-2785074_1920.jpg')}  alt="Third slide" />
        <Carousel.Caption>
          <h3 style={{color: '#000080',textShadow: '2px 2px 4px white'}}>Dog Toys</h3>
          <p id="p1">
          Birds love to destroy things. Appropriate chewable objects include untreated wood blocks, branches, pinecones, rawhide, natural fiber rope, cloth, and soft pine.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner2;