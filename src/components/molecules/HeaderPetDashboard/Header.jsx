import React from "react";
import "./Header.css";
import headerbg from "./peakpx.jpg";
import Rec from "../../atoms/Item 1";
import Create from "../CreateForm";
import { useState, useEffect } from "react";
import NavItems from "../../atoms/Navitems";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.jpg";
import per from "./dog.png";
import Menu from "../../atoms/MenuItems";
import notiicon from "./appointment-reminders-xxl.png";
import supabase from "../../../lib/helper/superbaseClient";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
  
const HeaderPetDashboard = () => {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const location = useLocation();
  const userId = location.state && location.state.userId;
  const navigate = useNavigate(); 

  
 
  const fetchPetNames = async () => {
    try {
      const { data, error } = await supabase
        .from('Pet_Profile') 
        .select('Pet_Profile_id,Pet_Name')
        .eq('Pet_owner_id', userId);


        const PetD = data.map((pet) => ({
                petName: pet.Pet_Name,
                petId: pet.Pet_Profile_id,

                
              }));

      if (error) {
        alert('Error fetching pet names:', error);
        return;
      }
      
      
      
      setDropdownItems(PetD);
    } catch (error) {
      console('Error fetching pet names:', error);
    }
  };

  useEffect(() => {
    
  
    if (userId) {
      fetchPetNames();
      
    }
  }, [userId]);


  const handlePetSelect = (event) => {
    setSelectedPet(event.target.value);
  };

  const handleProfileClick = (PetId) => {
    
    navigate('/ClickProfile', { state: { PetId,userId} });
    
  };
  
  

  return (
    <div
      className="header"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${headerbg}) center/cover no-repeat`,
      }}
    >
      <div className="container2">
        <div>
          <nav className="navbar navbar-expand-lg custom-navbar">
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <NavItems
                    NavItem
                    id={"nav"}
                    name={"Home"}
                    path={"/Profile"}
                  />
                  <NavItems
                    NavItem
                    id={"nav"}
                    name={"Pet Shop"}
                    path={"/loginshop"}
                  />

                  <li className="nav-item dropdown">
                    <a
                      style={{ marginTop: "8px" }}
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Menu
                    </a>
                    <ul className="dropdown-menu">
                      <Menu name={"Pet Shop"} path="/Homeshop"></Menu>
                      <Menu name={"Donate"} path="/Donate"></Menu>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 right">
                  <a href="/Notify" style={{textDecoration:'none'}}>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      marginRight: "15px",
                      width:'90px'
                    }}
                    class="btn btn-primary position-relative"
                  >
                    
                  </button>
                  </a>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        style={{ marginRight: "15%" }}
                        id="per"
                        src={per}
                        alt=""
                      />
                    </button>
                   
                    
              
             <ul class="dropdown-menu">
                      {dropdownItems.map((pet, index) => (
                        <li key={index} value={pet.petName}>
                          <a class="dropdown-item" style={{cursor:'pointer'}} onClick={() => handleProfileClick(pet.petId)}
>
                            {pet.petName}
                          </a>
                        </li>
                      ))}
                     
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" href="/">
                          log out
                        </a>
                      </li>
                    </ul>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="header__content text__center text__light flex flex__center">
          <Create  />
          <div
            style={{ marginRight: "20px" }}
            className="header__content--left"
          ></div>

          <Rec />
          <div
            style={{ marginLeft: "20px" }}
            className="header__content--right"
          >
            <h1 className="header__title fw__6">Create a Pet Profile</h1>
            <p className="para__text">
              Dedicated to Pets and People Dr.Pet Animal hospital is dedicated
              to offer you a quality veterinary service at a reasonable price.
              We are open all 7 days a week between 8.00am to 8.00pm and Poya
              days (8.00am – 5.00pm) to cater all your pet care needs.
              <br />
              Now you have the facility to create profiles for your pets. We are
              capable of vast number of services such as vaccination treatments
              to surgeries, digital X ray, Pet taxi and Ambulance services. We
              are dedicated to provide the best care for your pet companions
              throughout their lives. Please contact us on 0771289961 for all
              your animal health care needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPetDashboard;
