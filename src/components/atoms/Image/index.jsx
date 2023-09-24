import React from 'react';
import Image from './images.jpeg'; 
import './Image.css';

const MyImage = () => {
  return (
    <div>
      <img src={Image} className="img-fluid" alt="cha" />
    </div>
  );
};

export default MyImage;