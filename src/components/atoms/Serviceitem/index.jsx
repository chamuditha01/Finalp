import React from 'react';

const ServiceItem = ({ imgSrc, title, description }) => {
  return (
    <div className="image-container">
      <img src={imgSrc} alt={title} className="social-icon2" />
      <h3 className="footer__title1 color">{title}</h3>
      <p className="para">{description}</p>
      <div className="d-grid gap-2 col-6 mx-auto">
      
      </div>
    </div>
  );
};

export default ServiceItem;
