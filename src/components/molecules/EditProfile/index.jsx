import React, { useState } from 'react';
import './index.css';
import img3 from './peakpx.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import NavbarProfileclick from '../NavbarProfileclick';
import bg from './'

const EditProfile = () => {
  
  const [profileImage, setProfileImage] = useState(img3);
  const [petName, setPetName] = useState('Jessy');
  const [petAge, setPetAge] = useState(3);
  const [petBreed, setPetBreed] = useState('German shepard');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePetNameChange = (event) => {
    setPetName(event.target.value);
  };
  const handlePetNBreedChange = (event) => {
    setPetBreed(event.target.value);
  };

  const handlePetAgeChange = (event) => {
    setPetAge(event.target.value);
  };

  return (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${bg}) center/cover no-repeat`,
      margin: "0px",
    }}>
      <NavbarProfileclick/>
      <h1 id="h1pro">Edit Profile</h1>
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
          src={profileImage}
          alt="Profile"
        />

        <label htmlFor="fileInput" className="camera-icon" style={{ marginLeft: '49%', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faCamera} />
        </label>
        <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
        <br></br>
        <hr className="divider" />
        <label id="l1">Pet Name</label><br></br>
        <input
          type="text"
          defaultValue={petName}
          onChange={handlePetNameChange} 
          style={{width:'200px',marginLeft:'145px',borderRadius:'20px'}}
        ></input><br></br>
        <label id="l1">Pet Type</label>
        <select style={{ width: '200px', height: '30px', marginLeft:'145px', borderRadius: '20px' }} id="inputState" class="form-select" defaultValue="Dog">
          <option selected>Choose...</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Other</option>
        </select>
        
        <label id="l1">Pet Breed</label><br></br>
        <input
          type="text"
          defaultValue={petBreed}
          onChange={handlePetNBreedChange} 
          style={{width:'200px',marginLeft:'145px',borderRadius:'20px'}}
        ></input><br></br>

        <div class="col-12">
    <label for="inputage" id="l" class="form-label">Age</label>
    <input  style={{width:'200px',marginLeft:'145px',borderRadius:'20px',textAlign:'center',marginBottom:'20px'}}type="number" defaultValue={petAge}
          onChange={handlePetAgeChange}  class="form-control" id="Age"></input>
  
  </div>
  <div class="col-12">
    <a href="/EditProfile"><button style={{height:'50px',width:'100px',borderRadius:'20px',fontSize:'12px',marginBottom:'10px',fontStyle:'italic'}} type="submit" class="btn btn-primary" >Update</button>
  </a></div>
      </div><br></br><br></br><br></br><br></br>
    </div>
    
  );
};

export default EditProfile;

