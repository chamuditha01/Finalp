import React from "react";
import "./Header.css";
import headerbg from './peakpx.jpg'
import Rec from "../../atoms/Item 1";
import NavbarPetDashboard from "../NavbarPetDashboard";
import Create from "../CreateForm";


const HeaderPetDashboard = () => {
  return (
    <div
      className="header"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${headerbg}) center/cover no-repeat`
      
      }}
    >
      
      <div className="container2">
        <NavbarPetDashboard/>
        
      
        <div className="header__content text__center text__light flex flex__center"><Create/>
          <div style={{marginRight: '20px'}} className="header__content--left"></div>
          
          <Rec/>
          <div style={{marginLeft:'20px'}} className="header__content--right">
            
            <h1 className="header__title fw__6">Create a Pet Profile</h1>
            <p className="para__text">
              Dedicated to Pets and People Dr.Pet Animal hospital is dedicated
              to offer you a quality veterinary service at a reasonable price.
              We are open all 7 days a week between 8.00am to 8.00pm and Poya
              days (8.00am – 5.00pm) to cater all your pet care needs.
              <br />
              Now you have the facility to create profiles for your pets.
              We are capable of vast number of services such as vaccination
              treatments to surgeries, digital X ray, Pet taxi and Ambulance
              services. We are dedicated to provide the best care for your pet
              companions throughout their lives. Please contact us on 0771289961
              for all your animal health care needs.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPetDashboard;
