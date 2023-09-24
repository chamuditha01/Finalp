import React, { useState } from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel, Modal, Button } from 'react-bootstrap'; 

const Form1 = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

    if (isFormValid) {
      const message = `
        Email: ${formData.email}
        Password: ${formData.password}
        Address Line 1: ${formData.addressLine1}
        Address Line 2: ${formData.addressLine2}
        City: ${formData.city}
        State: ${formData.state}
        Zip: ${formData.zip}
      `;

      setAlertMessage(message);
      setShowModal(true);
    } else {
      
      alert("Error! Please fill  all fields.");
    }
  };

  const handleCloseModal = () => {
    
    setFormData({
      email: '',
      password: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
    });
    setShowModal(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '80px' }}>Sign In</h1>
      <center>
        <form
          style={{
            width: '300px',
            borderTopWidth: '5px',
            borderRadius: '10px',
            borderTopStyle: 'solid',
            marginTop: '40px',
            backgroundColor: '#a7b6f9',
            borderTopColor: '#000080',
            borderBottom: '30px',
            borderBottomStyle: 'solid',
            borderLeft: '4px',
            borderRight: '4px',
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            marginBottom: '100px',
          }}
          className="row g-3"
          onSubmit={handleSubmit}
        >
                <div className="col-md-6">
            <label style={{ color: '#000080' }} htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="zehan@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label style={{ color: '#000080' }} htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="col-12">
            <label style={{ color: '#000080' }} htmlFor="inputAddress" className="form-label">
              Address Line 1
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="No. 508 wackwella Road"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label style={{ color: '#000080' }} htmlFor="inputAddress2" className="form-label">
              Address Line 2
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="galle"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label style={{ color: '#000080' }} htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Galle"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label style={{ color: '#000080' }} htmlFor="inputState" className="form-label">
              Province
            </label>
            <select
              id="inputState"
              className="form-select"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            >
              <option selected>Choose...</option>
              <option>Southern</option>
              <option>western</option>
              <option>Sabaragamuwa</option>
              <option>Eastern</option>
            </select>
          </div>
          <div className="col-md-2">
            <label style={{ color: '#000080' }} htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="800000"
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            />
          </div>

          <center>
            <div className="col-12">
              <button
                style={{
                  padding: '5px',
                  width: '80px',
                  marginTop: '30px',
                  backgroundColor: '#000080',
                  marginBottom: '30px',
                }}
                type="submit"
                className="btn btn-primary"
              >
                Sign In
              </button>
            </div>
          </center>
        </form>
      </center>

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully Registered <br></br>Submission Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{alertMessage}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:'#000080'}} variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Form1;
