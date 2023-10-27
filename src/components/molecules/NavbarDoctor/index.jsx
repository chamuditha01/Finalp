import NavItems from "../../atoms/Navitems";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import logo from './logo.jpg'
import per from './login.png'
import { AiOutlineLogout } from 'react-icons/ai';
import { useLocation,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import supabase from "../../../lib/helper/superbaseClient";

function NavbarDoctor() {
  const location = useLocation();
  const docid = location.state && location.state.docid;
  const [doctorName, setDoctorName] = useState('');


  useEffect(() => {
    
    if (docid) {
      supabase
        .from('Doctor')
        .select('Doctor_Name')
        .eq('id', docid)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching doctor name:', error);
          } else if (data.length > 0) {
           
            setDoctorName(data[0].Doctor_Name);
          }
        });
    }
  }, [docid]);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar ">
        <div className="container-fluid">
         
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavItems NavItem id={"nav"} name={'Home'} path={'/'} />
               
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 right">
            <p id="dr">Hello Dr. {doctorName}</p>
              <div class="btn-group">
              <a href="/" className="icon-link"><button className="icon-sbutton"><AiOutlineLogout className='icon' /></button></a>
              </div> 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarDoctor;
