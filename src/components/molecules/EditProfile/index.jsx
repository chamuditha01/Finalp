import React, { useState, useEffect } from 'react';
import './index.css';
import NavbarProfileclick from '../NavbarProfileclick';
import bg from './peakpx.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../../../lib/helper/superbaseClient';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const petId = location.state && location.state.PetId;
  const userId = location.state && location.state.userId;

  const [profileData, setProfileData] = useState({
    petName: '',
    petType: 'Dog', 
    petBreed: '',
    petAge: 0, 
  });

  useEffect(() => {
    if (petId) {
      
      supabase
        .from('Pet_Profile')
        .select('*')
        .eq('Pet_Profile_id', petId)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching profile data:', error);
          } else if (data.length > 0) {
            const profile = data[0]; 
            setProfileData({
              petName: profile.Pet_Name,
              petType: profile.Pet_Type,
              petBreed: profile.Breed,
              petAge: profile.Pet_Age,
            });
          }
        });
    }
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const updateProfile = async () => {
    try {
      
      const { data, error } = await supabase
        .from('Pet_Profile')
        .update({
          Pet_Name: profileData.petName,
          Pet_Type: profileData.petType,
          Breed: profileData.petBreed,
          Pet_Age: profileData.petAge,
        })
        .eq('Pet_Profile_id', petId);

      if (error) {
        console.error('Error updating profile data:', error);
      } else {
      
        console.log('Profile data updated:', data);
        
        navigate('/profile', { state: { userId } }); 
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

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
        <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Edit Profile</h1>
        <br />
        <hr className="divider" />
        <label id="l1">Pet Name</label>
        <br />
        <input
        style={{fontSize:'15px',fontWeight:'inherit'}}
          id="i11"
          type="text"
          name="petName"
          value={profileData.petName}
          onChange={handleChange}
        />
        <br />
        <label id="l1">Pet Type</label>
        <select
        style={{fontSize:'15px',fontWeight:'inherit'}}
          id="i11"
          className="form-select"
          name="petType"
          value={profileData.petType}
          onChange={handleChange}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <label id="l1">Pet Breed</label>
        <br />
        <input
        style={{fontSize:'15px',fontWeight:'inherit'}}
          id="i11"
          type="text"
          name="petBreed"
          value={profileData.petBreed}
          onChange={handleChange}
        />
        <br />

        <div className="col-12">
          <label htmlFor="inputage" id="l" className="form-label">
            Age
          </label>
          <input
          style={{fontSize:'15px',fontWeight:'inherit'}}
            id="i11"
            type="number"
            name="petAge"
            value={profileData.petAge}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-12">
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
            onClick={updateProfile}
          >
            Update
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default EditProfile;
