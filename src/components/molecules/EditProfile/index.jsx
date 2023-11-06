import React, { useState, useEffect } from 'react';
import './index.css';
import img3 from './peakpx.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import NavbarProfileclick from '../NavbarProfileclick';
import bg from './peakpx.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../../../lib/helper/superbaseClient';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const PetId = location.state && location.state.PetId;
  const [profileImage, setProfileImage] = useState(img3);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState(0);
  const [petBreed, setPetBreed] = useState('unknown');

const fetchPetProfileData = async () => {
  try {
    const { data, error } = await supabase
      .from('Pet_Profile')
      .select('Pet_Name', 'Breed', 'Pet_Age')
      .eq('Pet_Profile_id', PetId)
      .single();

    if (error) {
      console('Error fetching pet profile data:', error);
      return;
    }

    if (data) {
      setPetName(data.Pet_Name);
      setPetAge(data.Pet_Age);
      setPetBreed(data.Breed || 'Unknown Breed');
    }
  } catch (error) {
    console('Error fetching pet profile data:', error);
  }
};

  useEffect(() => {
    

    fetchPetProfileData();
  }, [PetId]);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${bg}) center/cover no-repeat`,
        margin: '0px',
      }}
    >
      <NavbarProfileclick />
      <h1 id="h1pro">Edit Profile</h1>
      <div className="pro1">
        <h1 style={{textAlign:'center',marginTop:'40px'}}>Edit Profile</h1>
        <br></br>
        <hr className="divider" />
        <label id="l1">Pet Name</label>
        <br></br>
        <input id="i11" type="text" value={petName} onChange={(e) => setPetName(e.target.value)} />
        <br></br>
        <label id="l1">Pet Type</label>
        <select id="i11" className="form-select" defaultValue="Dog">
          <option selected>Choose...</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Other</option>
        </select>

        <label id="l1">Pet Breed</label>
        <br></br>
        <input
          id="i11"
          type="text"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
        />
        <br></br>

        <div className="col-12">
          <label htmlFor="inputage" id="l" className="form-label">
            Age
          </label>
          <input
            id="i11"
            type="number"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <a href="/EditProfile">
            <button
              style={{
                height: '50px',
                width: '100px',
                borderRadius: '20px',
                fontSize: '12px',
                marginBottom: '10px',
                fontStyle: 'italic',
              }}
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
          </a>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default EditProfile;
