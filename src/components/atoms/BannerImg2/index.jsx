import React from 'react';
import ban1 from './Labrador-Puppies.jpg';
import './Ban3.css';

const BannerImg1 = () => {
  return (
    <div>
      <img style={{height: '300px',width: '1500px',marginTop: '50px',borderRadius:'0px'}} id="i" className='img-fluid' src={ban1} alt="Image 1" />
    </div>
  );
}

export default BannerImg1;
