import React, { useState } from 'react';
import './index.css';
import img3 from './peakpx.jpg';
import bg from './peakpx.jpg'
import NavbarProfileclick from '../NavbarProfileclick';


const ViewProfile = () => {
  
  const [Dog]=useState()

  return (
    <div 
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${bg}) center/cover no-repeat`,
      margin: "0px",
    }}
    >
      <NavbarProfileclick/>
      <h1 id="h1pro">View Profile</h1>
      <div className="pro1">
        <img
          style={{
            borderRadius: '50px',
            width: '100px',
            height: '100px',
            marginLeft: '40%',
            objectFit: 'cover',
            marginTop: '30px',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'grey',
            boxShadow:'inherit'
          }}
          src={img3}
          alt="Profile"
        />

        
       
        <hr className="divider" />
        <label id="l1">Pet Name</label><br></br>
        <input
          type="text"
          Value="Dog"
          
          style={{width:'200px',marginLeft:'145px',borderRadius:'20px'}}
        ></input><br></br>
        <label id="l1">Pet Type</label>
        <select style={{ width: '200px', height: '30px', marginLeft:'145px', borderRadius: '20px' }} id="inputState" class="form-select" value={Dog}>
          <option selected>Choose...</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Other</option>
        </select>
        
        <label id="l1">Pet Breed</label><br></br>
        <input
          type="text"
          
          value="German shepard"   style={{width:'200px',marginLeft:'145px',borderRadius:'20px'}}
        ></input><br></br>

        <div class="col-12">
    <label for="inputage" id="l" class="form-label">Age</label>
    <input  style={{width:'200px',marginLeft:'145px',borderRadius:'20px',textAlign:'center',marginBottom:'20px'}}type="number" Value={3}
            class="form-control" id="Age"></input>
  
  </div>
  
      </div>
      <br></br><br></br><br></br><br></br>
    </div>
    
  );
};

export default ViewProfile;

