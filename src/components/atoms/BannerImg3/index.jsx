import React from 'react';
import ban1 from './depositphotos_9889235-stock-photo-group-of-twelve-dogs.jpg';
import './index.css';

const BannerImg1 = () => {
  return (
    <div>
      <img style={{height: '300px',width: '1500px',marginTop: '50px',borderRadius:'0px'}} id="i" className='img-fluid' src={ban1} alt="Image 1" />
    </div>
  );
}

export default BannerImg1;
