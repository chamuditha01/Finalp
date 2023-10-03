import React from "react";
import "./Header.css";
import headerbg from './advice-please-fostering-a-pittie-with-a-very-traumatic-v0-peono59mtuqb1.jpg'
import Rec from "../../atoms/Item 1";
import NavbarProfileclick from "../NavbarProfileclick";
import AppointmentScheduler from "../../atoms/Appointmentdatepicker";


const HeaderProfileClick = () => {
  return (
    <div
      className="header"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${headerbg}) center/cover no-repeat`,
        objectFit:'cover'
      }}
    >
      
      <div className="container2">
        <NavbarProfileclick/>
        
      
        <div className="header__content text__center text__light flex flex__center">
          <div><AppointmentScheduler/>
            </div>
          <div style={{marginRight: '20px'}} className="header__content--left"></div>
          
          <Rec/>
          <div style={{marginLeft:'20px'}} className="header__content--right">
            
            <h1 className="header__title fw__6">Appointment Scheduling</h1>
            <p className="para__text">
            An appointment scheduling system for pet treatment is a crucial tool 
            for both pet owners and veterinary clinics. This system allows pet 
            owners to easily book and manage appointments for their pets' medical needs.
             It often includes features such as online booking platforms, 
             automated reminders, and the ability to provide essential pet 
             information. The system enhances convenience for pet owners, 
             reduces no-shows through reminder notifications, and 
             accommodates changes in appointments
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfileClick;
