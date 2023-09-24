import React from 'react';

const Footeritems = ({ href, imgSrc, imgAlt, spanText }) => {
  return (
    <li>
      <a href={href}>
        <img src={imgSrc} alt={imgAlt} className="social-icon" />
        <span>{spanText}</span>
      </a>
    </li>
  );
};

export default Footeritems;
