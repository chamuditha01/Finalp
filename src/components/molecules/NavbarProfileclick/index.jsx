import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import logo from './logo.jpg'
import per from './dog.png'
import Menu from "../../atoms/MenuItems";
import PopupForm from "../OrderForm";
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import supabase from "../../../lib/helper/superbaseClient";
import { useState } from "react";


function NavbarProfileclick() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const userId = location.state && location.state.userId;
  const PetId = location.state && location.state.PetId;
  const [petName, setPetName] = useState('');
  

  useEffect(() => {
    if (PetId) {
     
      async function fetchPetName() {
        const { data, error } = await supabase
          .from('Pet_Profile')
          .select('Pet_Name')
          .eq('Pet_Profile_id', PetId)
          .single();

        if (error) {
          console.error('Error fetching pet name:', error);
        } else {
          if (data) {
            setPetName(data.Pet_Name);
          }
        }
      }

      fetchPetName();
    }
  }, [PetId]);

  const handleProfileClick = () => {
    
    navigate('/Profile', { state: { userId } });
  };
  const handleProfileClic = () => {
    
    navigate('/EditProfile', { state: { PetId,userId } });
    
  };
  
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
             
              <a id="nav" class="nav-link active" aria-current="page" style={{cursor:'pointer'}} onClick={handleProfileClick}>home</a>
              <PopupForm/>
              <li className="nav-item dropdown">
                <a
                style={{marginTop:'8px'}}
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Menu
                </a>
                <ul className="dropdown-menu">
                  
                  <Menu name={'Donate'} path='/Donate'></Menu>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <Menu name={'Appointment'} path='/Appointment'></Menu>
                  
                </ul>
              </li>
            </ul>

            {petName && (
        <div style={{color:'white',fontSize:'20px',fontWeight:'bold'}} class="nav-link active">
          Pet Name: {petName}
        </div>
      )}

      
            <ul className="navbar-nav mb-2 mb-lg-0 right">
             
              
              
              
              
              
              <div class="btn-group">
                <button type="button" class="btn btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img style={{marginRight:'15%'}} id="per" src={per} alt="" />
                </button>
                <ul class="dropdown-menu">
                  
                  <li><a class="dropdown-item" style={{cursor:'pointer'}}   onClick={handleProfileClic}>Profile</a></li>
                  
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="/Profile" onClick={handleProfileClick}>log out</a></li>
                </ul>
              </div>
              
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarProfileclick;
