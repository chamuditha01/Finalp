import './index.css'
import React, { useState } from "react";

const Create = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [petName, setPetName] = useState(""); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const handleCreateClick = () => {
    
    if (petName) {
      onSubmit(petName);
      setPetName("");
    }
  };

  return (
    <div>
      <form id="form1" class="row g-3">
        <div class="col-12">
          <label for="PetName" id="l" class="form-label">
            Pet Name
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
            }}
            id="inputState"
            class="form-select"
          >
            <option selected>Choose...</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Other</option>
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
        <div className="col-12">
          <label id="l" className="form-label">
            Profile Pic
          </label>
          <input
            style={{ width: "200px", marginLeft: "50px", borderRadius: "20px" }}
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
                height: "40px",
                marginLeft: "125px",
                width: "40px",
                borderRadius: "40px",
                objectFit:'cover'
              }}
            />
          </div>
        )}

        <div class="col-12">
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
            class="btn btn-primary"
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
