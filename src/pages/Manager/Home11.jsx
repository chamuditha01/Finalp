// Home11.js

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import AppointmentPopup from './AppointmentPopup';
import Docpopup from './Docpopup';
import Cagepopup from './Cagepopup';
import Hvisitpopup from './Hvisitpopup';
import VaccinationsPopup from './Vaccinations';
import Petownerpopup from './Petownerpopup';
import Vaccinationsshedul from './Vaccinationshedul'; 
import './dt.css';
import { GiClick } from 'react-icons/gi';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaStethoscope, FaDog } from 'react-icons/fa';
import { TbVaccineOff } from 'react-icons/tb';
import { PiDogFill } from 'react-icons/pi';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { useLocation,useNavigate } from 'react-router-dom';

import { useTheme } from '../../ThemeProvider';

import supabase from '../../lib/helper/superbaseClient';


function Home11() {
  const { darkMode, toggleDarkMode, colorMode, changeColorMode } = useTheme();
  const location = useLocation();
  const manager_id = location.state && location.state.manager_id ;
  const [popupOpen, setPopupOpen] = useState(null);
  const [data, setData] = useState([]);
  const [petOwnerCount, setPetOwnerCount] = useState(0);
  const [petdoc, setpetdoc] = useState(0);
  const [petvaccine, setpetvaccine] = useState(0);
  const [petClinicAppointmentsCount, setPetClinicAppointmentsCount] = useState(0);
  const [PethomeAppointmentsCount,setPethomeAppointmentsCount] = useState(0);



  const togglePopup = (popupType) => {
    if (popupType === popupOpen) {
      setPopupOpen(null);
    } else {
      setPopupOpen(popupType);
    }
  };
  

  useEffect(() => {

    
    const currentDate = new Date();
    const lastWeekDates = [];
    const nextWeek = new Date(currentDate); 
    nextWeek.setDate(currentDate.getDate() + 7);
  
    const today = currentDate.toISOString().split("T")[0];
    const nextSevenDays = nextWeek.toISOString().split("T")[0];
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      lastWeekDates.push(formattedDate);
    }
  
    setData(
      lastWeekDates.map((date) => ({
        name: date,
        PetClinic: Math.floor(Math.random() * 500) + 100,
        HomeVisit: Math.floor(Math.random() * 500) + 100,
      }))
    );

    const fetchPetClinicAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('Appointment')
          .select('Appointment_id')
          .eq('appointment_type', 'Clinic')
          .gte('date', today)
          .lte('date', nextSevenDays);
  
        if (error) {
          console.error('Error fetching Pet Clinic appointments:', error);
        } else {
          const appointmentCount = data.length;
          setPetClinicAppointmentsCount(appointmentCount);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchPethomeAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('Appointment')
          .select('Appointment_id')
          .eq('appointment_type', 'Home Visit')
          .gte('date', today)
          .lte('date', nextSevenDays);
  
        if (error) {
          console.error('Error fetching Pet Clinic appointments:', error);
        } else {
          const appointmentCount1 = data.length;
          setPethomeAppointmentsCount(appointmentCount1);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchcustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('Customer')
          .select('Customer_id');
    
        if (error) {
          console.error('Error fetching stock quantity:', error);
        } else {
         
          const customers = data.length;
          setPetOwnerCount(customers);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchdoctors = async () => {
      try {
        const { data, error } = await supabase
          .from('Doctor')
          .select('id');
    
        if (error) {
          console.error('Error fetching stock quantity:', error);
        } else {
          
          const doctors = data.length;
          setpetdoc(doctors);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    const fetchvaccines = async () => {
      try {
        const { data, error } = await supabase
          .from('Vaccines')
          .select('Vaccination_id');
    
        if (error) {
          console.error('Error fetching stock quantity:', error);
        } else {
          
          const vaccine = data.length;
          setpetvaccine(vaccine);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchvaccines();
    fetchcustomers();
    fetchdoctors();
    fetchPetClinicAppointments();
    fetchPethomeAppointments();
  }, []);


  return (
    <main className={`main-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='main-title'>
        <h3> PET CLINIC</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('Appointment')}>Clinic Appointment <GiClick className='card_icon' /></a>
            <BsCalendar2Date className='card_icon' />
          </div>
          <h1>{petClinicAppointmentsCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('PetownerPopup')}> Pet Owner <GiClick className='card_icon' />
            </a><FaDog className='card_icon' />
          </div>
          <h1>{petOwnerCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('DocPopup')}>Doctor Availability<GiClick className='card_icon' /></a>
            <FaStethoscope className='card_icon' />
          </div>
          <h1>{petdoc}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('CagePopup')}>Cages availability<GiClick className='card_icon' /></a>
            <PiDogFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='card card-green'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('HvisitPopup')}>Homevisit Appointment<GiClick className='card_icon' /></a>
            <BsCalendar2Date className='card_icon' />
          </div>
          <h1>{PethomeAppointmentsCount}</h1>
        </div>
        <div className='card card-blue'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('VaccinationsPopup')}>Vaccines<GiClick className='card_icon' /></a>
            <TbVaccineOff className='card_icon' />
          </div>
          <h1>{petvaccine}</h1>
        </div>
        <div className='card card-yelow'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('Vaccinationsshedul')}> vaccines shedule <GiClick className='card_icon' /></a>
            <TbVaccineOff className='card_icon' />
          </div>
          <h1>42</h1>
        </div>
      </div>

      {popupOpen === 'Appointment' && <AppointmentPopup />}
      {popupOpen === 'DocPopup' && <Docpopup />}
      {popupOpen === 'CagePopup' && <Cagepopup />}
      {popupOpen === 'HvisitPopup' && <Hvisitpopup />}
      {popupOpen === 'VaccinationsPopup' && <VaccinationsPopup />}
      {popupOpen === 'Vaccinationsshedul' && <Vaccinationsshedul />}

      {popupOpen === 'PetownerPopup' && <Petownerpopup />}

      <h3 className='h1'>Appointments dashboard</h3>
      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            className="chart" // Apply the CSS class to the BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="PetClinic" fill="#8884d8" />
            <Bar dataKey="HomeVisit" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            className="chart" // Apply the CSS class to the LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="PetClinic" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="HomeVisit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home11;
