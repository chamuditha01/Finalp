import React from 'react';
import './Txtimg.css';
import Img from './download.webp';
import { useInView } from 'react-intersection-observer';

const TextImg = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`text-img ${inView ? 'visible' : ''}`}>
      <div style={{ marginTop: '30px' }} className="card text-bg-dark">
        <center>
          <img
            style={{ width: '600px', height: '300px' }}
            src={Img}
            className="img-fluid"
            alt="..."
          />
        </center>
        <div className="card-img-overlay">
          <h5 className="card-title">Pet Products</h5>
          <p className="card-text">
            The pet industry (sometimes known as petconomy) is the market
            industry associated with companion animals. It includes things
            that are associated with the production, consumption, and cultural
            activities linked to the market.
          </p>
          <p className="card-text">
            <small>Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextImg;
