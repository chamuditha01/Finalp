import React from "react";
import "./Header.css";
import headerbg from './Vet-with-dog.jpg'
import Rec from "../../atoms/Item 1";
import img from './home-intro-image-1.jpg'
import NavbarDoctor from "../NavbarDoctor";
import AutoRotatableCard from '../../atoms/rotate';
import headerb from './cbak1.jpg';
import DoctorNot from '../../atoms/DoctorNot';
import supabase from "../../../lib/helper/superbaseClient";
import { useState,useEffect} from "react";
import { useLocation } from "react-router-dom";

const HeaderDoctor = () => {
  const location = useLocation();
  const docid1 = location.state && location.state.docid;
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  

  
  const openPopup = (appointment) => {
    setSelectedAppointment(appointment);
  };


  const closePopup = () => {
    setSelectedAppointment(null);
  };

  
  React.useEffect(() => {
    const currentDate = new Date();
    const lastWeekDates = [];
    const nextWeek = new Date(currentDate); 
    nextWeek.setDate(currentDate.getDate() + 7);
  
    const today = currentDate.toISOString().split("T")[0];
    const nextSevenDays = nextWeek.toISOString().split("T")[0];
    
    const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase.from("Appointment").select("date, Description, appointment_type").eq('Doctor_id', docid1)
      .eq('status','accept').gte('date', today)
      .lte('date', nextSevenDays);
      if (error) {
        alert("Error fetching appointments:", error);
      } else {
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
    fetchAppointments();
  }, []);

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
          no={appointment.date}
          cont={appointment.Description}
          time={appointment.appointment_type}
          onClick={() => openPopup(appointment)}
        />
      ))}

      {selectedAppointment && (
        <DoctorNot
          appointment={selectedAppointment}
          onClose={closePopup}
        />
      )}
        </div>
          </div>
          
          
        
      </div>
    
  );
};

export default HeaderDoctor;