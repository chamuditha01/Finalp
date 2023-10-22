import React from 'react';
import image2 from './cbak2.jpg';
import './index.css';
import  { useEffect, useState } from 'react';
import supabase from '../../lib/helper/superbaseClient';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passward: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const { data, error } = await supabase.from('Manager').upsert([
      {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        passward: formData.passward,
        address: formData.address,
      },
    ]);

    if (error) {
      alert('Error inserting data:', error);
    } else {
      alert('Data inserted successfully:', data);
      
    }
  };

  return (
    <div>
      <div className="container-fluid bg-dark text-light py-3">
        <header className="text-center">
          <h1 className="display-6">Welcome to our page</h1>
        </header>
      </div>
      <div className="container my-2 bg-dark text-light p-2">
        <div className="row">
        <div className="col-md-6 d-none d-md-block">
            <img src={image2} alt="ful" className="ful" />
          </div>
          <div className="col-md-6">
            <section className="container w-100 text-light p-2">
              <form className="row g-3 p-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                  <label htmlFor="validationDefault01" className="form-label">First name</label>
                  <input type="text" className="form-control" name='firstName' value={formData.firstName}
            onChange={handleChange} id="firstName" required />
                </div>
                <div className="col-md-4">
                  <label htmlFor="validationDefault02" className="form-label">Last name</label>
                  <input type="text" className="form-control" name='lastName' value={formData.lastName}
            onChange={handleChange} id="lastName" required />
                </div>
                <div className="col-md-4">
                  <label htmlFor="validationDefaultUsername" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">@</span>
                    <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">Email</label>
                  <input type="email" className="form-control" name='email' value={formData.email}
            onChange={handleChange} id="email"  required/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" name='passward' value={formData.password}
                  onChange={handleChange}  id="passward" required />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">Address</label>
                  <input type="text" className="form-control" value={formData.address}
            onChange={handleChange} name='address' id="address" placeholder="1234 Main St"  required/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                  <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">City</label>
                  <input type="text" className="form-control" id="inputCity"  required/>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">State</label>
                  <select id="inputState" className="form-select" required>
                    <option selected>Choose...</option>
                    <option>Central</option>
                    <option>Eastern</option>
                    <option>North Central</option>
                    <option>Northern</option>
                    <option>North Western</option>
                    <option>Sabaragamuwa</option>
                    <option>Southern</option>
                    <option>Uva</option>
                    <option>Western</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="inputZip"  required/>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"required />
                    <label className="form-check-label" htmlFor="gridCheck" >
                    Check me out
                    </label>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary mx-2">Register</button>
                  <a href={'/'} className="btn btn-primary mx-2 text-decoration-none" style={{paddingTop:'20px'}}>
                    Back
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
