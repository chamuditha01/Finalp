import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../ASSETS/Images/logo.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { MdDarkMode } from 'react-icons/md';
import {  BsSun } from 'react-icons/bs';
import { useTheme } from '../../../../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../../lib/helper/superbaseClient';

const Navbar = ({ reloadnavbar, cusId }) => {
  const [cartquantity, setcartquantity] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate(); 
  const [orderCount, setOrderCount] = useState(0); 

  const handlecart = () => {
    
    navigate('/cart', { state: { cusId } });
  };

  const handlehome = () => {
    
    navigate('/Homeshop', { state: { cusId } });
  };

  const fetchOrderCount = async () => {
    try {
      
      const { data, error } = await supabase
        .from('Order_Item')
        .select('Oder_Item_id')
        .eq('cusid', cusId)
        .eq('status', 'n');

      if (!error) {
        setOrderCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  useEffect(() => {
    
    fetchOrderCount(); 

    

  }, [cusId]); 

  

  return (
    <nav className={darkMode ? 'dark-mode' : ''}>
      <div className='s1'>
        <a href='/'>
          <img src={logo} alt='logo' className='logo' />
        </a>

        <div className='searchbar'>
          <input type="text" placeholder="Search for products and categories" className='search' />

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

        <div className='right'>
          <div className='cart'>
            <span className='qty' style={{backgroundColor:'lightblue', width:'20px',height:'20px',borderColor:'blue', borderStyle:'solid', borderWidth:'1px'}}>{orderCount}</span>
            <a onClick={handlecart}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </a>
          </div>
          <button className="icon-button icon" onClick={toggleDarkMode}>
          {darkMode ? <BsSun className="white-icon" /> : <MdDarkMode />}
        </button>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/user/accountsettings">Profile</Dropdown.Item>
              <Dropdown.Item href="/">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
      

        </div>
      </div>
      <div className='s2'>
        
          <a onClick={handlehome}>Home</a>
        
        <Link to=''>
          <a>About Us</a>
        </Link>
        <Link to=''>
          <a>Contact Us</a>
        </Link>
        
        
      </div>
    </nav>

  );
};

export default Navbar;
