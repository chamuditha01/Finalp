import './index.css'
import React, { useState } from "react";
import supabase from '../../../lib/helper/superbaseClient';
import { useLocation } from 'react-router-dom';

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [petName, setPetName] = useState(""); 
  const location = useLocation();
  const userId = location.state && location.state.userId;

  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const handleCreateClick = async () => {
    if (petName) {
      
      const petData = {
        Pet_Name: petName,
        Breed: document.getElementById('Breed').value, 
        Pet_Type: document.getElementById('inputState').value, 
        Pet_Age: parseInt(document.getElementById('Age').value), 
        Pet_owner_id: userId
      };

      

      const { data, error } = await supabase
        .from('Pet_Profile') 
        .insert([petData]);

      if (error) {
        alert('Error creating pet:', error);
        return;
      }

      setPetName("");
      setSelectedImage(null);
       }
  };

  return (
    <div>
      <form id="form1" className="row g-3">
        
		 <div class="col-12">
          <label for="PetName" id="l" class="form-label">
            Pet Name*
          </label>
          <input
            style={{ width: "200px", marginLeft: "50px", borderRadius: "20px" }}
            type="text"
            class="form-control"
            id="Petname"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div class="col-12">
          <label id="l" for="inputtype" class="form-label">
            Type
          </label>
          <select
            style={{
              width: "200px",
              height: "30px",
              marginLeft: "50px",
              borderRadius: "20px",
              fontSize:'13px'
            }}
            id="inputState"
            class="form-select"
            
          >
            <option selected>Choose...</option>
            <option style={{fontSize:'13px'}}>Dog</option>
            <option style={{fontSize:'13px'}}>Cat</option>
            <option style={{fontSize:'13px'}}>Other</option>
          </select>
        </div>
        <div class="col-12">
          <label for="inputAddress" id="l" class="form-label">
            Breed
          </label>
          <input
            style={{ width: "200px", marginLeft: "50px", borderRadius: "20px" }}
            type="text"
            class="form-control"
            id="Breed"
            placeholder="Eg: German shepard"
          ></input>
        </div>
        <div class="col-12">
          <label for="inputage" id="l" class="form-label">
            Age
          </label>
          <input
            style={{
              width: "200px",
              marginLeft: "50px",
              borderRadius: "20px",
              textAlign: "center",
            }}
            type="number"
            class="form-control"
            id="Age"
          ></input>
        </div>
        
        {selectedImage && (
          <div className="col-12">
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                height: "40px",
                marginLeft: "125px",
                width: "40px",
                borderRadius: "40px",
                objectFit:'cover'
              }}
            />
          </div>
        )}

        <div className="col-12">
          <button
            style={{
              height: "50px",
              width: "100px",
              borderRadius: "20px",
              fontSize: "12px",
              marginBottom: "10px",
              fontStyle: "italic",
            }}
            type="button"
            className="btn btn-primary"
            onClick={handleCreateClick} 
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
