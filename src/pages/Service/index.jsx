import React from 'react';
import Navbar from "../../components/molecules/Navbar";
import image1 from './cbak1.jpg';
import Carousel from "../../components/atoms/carousel";
import './index.css';
import ServiceItem from '../../components/atoms/Serviceitem';


const Service = () => {
  return (
    <div>
      <div className="container1">
        <div className="container1" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),url(${image1})` }}>
          <Navbar />
          <h4 className="header__title fw__6 heder pading1 color">Our Services</h4>
          <Carousel />
          <div className="heder"></div>

          <ul className="footer__links">
            <li className='left'>
              
              <ServiceItem
                imgSrc="images/C2.jpg"
                title="Online Appointments"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
             
              <ServiceItem
                imgSrc="images/c3.jpg"
                title="OPD Treatments"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
              <ServiceItem
                imgSrc="images/c5.jpg"
                title="Surgery Unit"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
            </li>
            <li>
             
              <ServiceItem
                imgSrc="images/lab.png"
                title="Modern Laboratory"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
              <ServiceItem
                imgSrc="images/c1.jpg"
                title="Pet Boarding"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
              <ServiceItem
                imgSrc="images/C4.jpg"
                title="Pet Store"
                description="Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Service;
