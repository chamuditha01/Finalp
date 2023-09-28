import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import AppointmentPopup from './AppointmentPopup';
import Alertpopup from './Alertpopup'
import Hvisitpopup from './Hvisitpopup';
import Stokepopup from './Stokepopup'
import './dt.css'

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs'
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

function Phome11() {
  const [popupOpen, setPopupOpen] = useState(null);
  const [data, setData] = useState([]);

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
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      lastWeekDates.push(formattedDate);
    }
    
    setData(lastWeekDates.map(date => ({
      name: date,
      Sales: Math.floor(Math.random() * 5000) + 1000,
      oders: Math.floor(Math.random() * 5000) + 1000,
    })));
  }, []);

  return (
    <main className='main-container dark-blue-bg'> 
      <div className='main-title'>
        <h3>PET SHOP</h3>
      </div>

      <div className='main-cards'>
       
        <div className='card'>
          <div className='card-inner h3'>
           Sold Quanty
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>42</h1>
        </div>        
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('Stokepopup')}>Stoke Quanty</a>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <a href="#" className='h3' onClick={() => togglePopup('Alertpopup')}>ALERT</a>
            < BsFillBellFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
       
      </div>

      {popupOpen === 'Appointment' && <AppointmentPopup />}
      {popupOpen === 'Stokepopup' && <Stokepopup />}
      {popupOpen === 'Alertpopup' && <Alertpopup />}
      {popupOpen === 'HvisitPopup' && <Hvisitpopup />}
      <h3 className='h1'>Sales Dashboard</h3>
      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <Bar dataKey="Sales" fill="#8884d8" />
            <Bar dataKey="oders" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="oders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Phome11;
