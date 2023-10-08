import React from "react";
import "./Header.css";
import headerbg from './Vet-with-dog.jpg'
import Rec from "../../atoms/Item 1";
import img from './home-intro-image-1.jpg'
import NavbarDoctor from "../NavbarDoctor";
import AutoRotatableCard from '../../atoms/rotate';
import headerb from './cbak1.jpg';
import DoctorNot from '../../atoms/DoctorNot';


const HeaderDoctor = () => {

  const appointments = [
    {
        no: "Appointment 1",
        head: "Leg Issue",
        cont: "Leg issue due to accident",
        time: "2023/08/10 12:45"
    },
    {
        no: "Appointment 2",
        head: "Mouth Issue",
        cont: "Mouth issue due to accident",
        time: "2023/08/10 12:45"
    },
    {
        no: "Appointment 3",
        head: "Eye Issue",
        cont: "Eye issue due to accident",
        time: "2023/08/10 12:45"
    },
    {
      no: "Appointment 4",
      head: "Eye Issue",
      cont: "Eye issue due to accident",
      time: "2023/08/10 12:45"
  }
];

const numberOfAppointments = appointments.length;

  return (
    <div
      className="header"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${headerbg}) center/cover no-repeat`,
        objectFit:'cover'
      }}
    >
      
      <div className="container2">
        <NavbarDoctor/>
        
      
        <div className="header__content text__center text__light flex flex__center">
          
          <div style={{marginRight: '0px'}} className="header__content--left">
            <h1 className="header__title fw__6">Available Appointments</h1>
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
          </div><Rec/>
          
          
          <div style={{marginLeft:'0px'}} className="header__content--right">
            
          <AutoRotatableCard numberOfAppointments={numberOfAppointments} />
          </div>
          </div>
          <div style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${headerb}) center/cover no-repeat`,
            objectFit: 'cover'
        }}>
            
            
            
            {appointments.map((appointment, index) => (
                <DoctorNot
                    key={index}
                    no={appointment.no}
                    head={appointment.head}
                    cont={appointment.cont}
                    time={appointment.time}
                />
            ))}
        </div>
          </div>
          
            
        
      </div>
    
  );
};

export default HeaderDoctor;
