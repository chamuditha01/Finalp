import React from 'react';
import './index.css';
import { useState } from 'react';

const Create = () => {

    const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <div>
      
      <form id="form1" class="row g-3" >
  <div class="col-12">
    <label for="PetName" id="l" class="form-label">Pet Name</label>
    <input  style={{width:'200px',marginLeft:'50px',borderRadius:'20px'}} type="name" class="form-control" id="Petname"></input>
  </div>
  <div class="col-12">
    <label id="l" for="inputState" class="form-label">Type</label>
    <select  style={{width:'200px',height:'30px',marginLeft:'50px',borderRadius:'20px'}} id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>Dog</option>
      <option>Cat</option>
      <option>Other</option>
    </select>
  </div>
  <div class="col-12">
    <label for="inputAddress" id="l" class="form-label">Breed</label>
    <input style={{width:'200px',marginLeft:'50px',borderRadius:'20px'}} type="text" class="form-control" id="Breed" placeholder="Eg: German shepard"></input>
  </div>
  <div class="col-12">
    <label for="inputCity" id="l" class="form-label">Age</label>
    <input  style={{width:'200px',marginLeft:'50px',borderRadius:'20px',textAlign:'center'}}type="number" class="form-control" id="Age"></input>
  </div>
  <div className="col-12">
          <label id="l" className="form-label">Profile Pic</label>
          <input
            style={{ width: '200px', marginLeft: '50px', borderRadius: '20px' }}
            type="file"
            className="form-control"
            id="imageUpload"
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
        {selectedImage && (
          <div className="col-12">
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                height:'40px',
                marginLeft: '125px',
                width:'40px',
                borderRadius: '40px',
              }}
            />
          </div>
        )}

  <div class="col-12">
    <button style={{height:'50px',width:'100px',borderRadius:'20px',fontSize:'12px',marginBottom:'10px',fontStyle:'italic'}} type="submit" class="btn btn-primary">Create</button>
  </div>
</form>

        
      
    </div>
  );
};

export default Create;