import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AppointmentPopup from './AppointmentPopup';
import Alertpopup from './Alertpopup';
import Hvisitpopup from './Hvisitpopup';
import Stokepopup from './Stokepopup';
import './dt.css';
import { GiClick } from 'react-icons/gi';
import { BiStore } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { useTheme } from '../../ThemeProvider';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
function Phome11() {
  const { darkMode, toggleDarkMode, colorMode, changeColorMode } = useTheme();
  const [popupOpen, setPopupOpen] = useState(null);
  const [data, setData] = useState([]);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [soldAmountCount, setSoldAmountCount] = useState(0);


  const supabaseUrl = 'YOUR_SUPABASE_URL';
  const supabaseKey = 'YOUR_SUPABASE_API_KEY';
  const supabase = createClient("https://kjrjrvwfyjngatmeinsk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcmpydndmeWpuZ2F0bWVpbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3ODQ4MTcsImV4cCI6MjAxMjM2MDgxN30.6gqrC0IfJVrgS-Bipm9kf0bYP_g3r2y4dk4mfUK7o-M");

  const togglePopup = (popupType) => {
    if (popupType === popupOpen) {
      setPopupOpen(null);
    } else {
      setPopupOpen(popupType);
    }
  };

  const fetchsold = async () => {
    try {
      const { data, error } = await supabase
        .from('Order_Item')
        .select('Oder_Item_id');
  
      if (error) {
        console.error('Error fetching stock quantity:', error);
      } else {
        
        const soldAmountCount = data.length;
        setSoldAmountCount(soldAmountCount);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  

  

  const fetchStockQuantity = async () => {
    try {
      const { data, error } = await supabase
        .from('product1')
        .select('id');
  
      if (error) {
        console.error('Error fetching stock quantity:', error);
      } else {
        
        const stockQuantity = data.length;
        setStockQuantity(stockQuantity);
      }
    } catch (error) {
      console.error('An error occurred:', error);
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

    setData(
      lastWeekDates.map((date) => ({
        name: date,
        Sales: Math.floor(Math.random() * 5000) + 1000,
        oders: Math.floor(Math.random() * 5000) + 1000,
      }))
    );

    fetchStockQuantity();
    fetchsold();
    
  }, []);

  return (
    <main className={`main-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="main-title">
        <h3>PET SHOP</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner h3">
            Sold Quanty
            <BiStore className="card_icon" />
          </div>
          <h1>{soldAmountCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <a href="#" className="h3" onClick={() => togglePopup('Stokepopup')}>
              Order Quanty <GiClick className="card_icon" />
            </a>
            <BiStore className="card_icon" />
          </div>
          <h1>{stockQuantity}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <a href="#" className="h3" onClick={() => togglePopup('Alertpopup')}>
              ALERT <GiClick className="card_icon" />
            </a>
            <BsFillBellFill className="card_icon" />
          </div>
         
        </div>
      </div>

      {popupOpen === 'Appointment' && <AppointmentPopup />}
      {popupOpen === 'Stokepopup' && <Stokepopup />}
      {popupOpen === 'Alertpopup' && <Alertpopup />}
      {popupOpen === 'HvisitPopup' && <Hvisitpopup />}
      <h3 className="h1">Order Dashboard</h3>
      <div className="charts">
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
            
            <Line type="monotone" dataKey="oders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Phome11;