import './index.css';
import email from './email.png';
import pass from './password.png';
import per from './person.png';
import image2 from './cbak2.jpg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ForgotPasswordModal from '../popup';

const Login = () => {
  const navigate = useNavigate(); 
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('Manager');
  const toggleForgotPassword = () => {
    setForgotPasswordOpen(!forgotPasswordOpen);
  };  const handleUsernameChange = (e) => {
    setSelectedUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    
    const emailValue = document.getElementById('inputEmail4').value;
    const password = document.getElementById('inputPassword4').value;

 
    if (selectedUsername && emailValue && password) {
      if (selectedUsername === 'Manager') {
        navigate('/Manager');
      } else if (selectedUsername === 'PetOwner') {
        navigate('/Profile');
      } else if (selectedUsername === 'Doc') {
        navigate('/DoctorPage');
      }
    } else {
      alert('Please fill in all required fields.');
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
            <img src={image2} alt="ful" className="ful img-fluid" />
          </div>
          <div className="col-md-6">
            <section className="container w-100 text-light p-2">
              <form className="row g-3 p-3">
                <div className="col-md-12">
                  <label htmlFor="validationDefaultUsername" className="form-label">
                    Username
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      id="validationDefaultUsername"
                      value={selectedUsername}
                      onChange={handleUsernameChange}
                    >
                      <option value="Manager">Manager</option>
                      <option value="PetOwner">PetOwner</option>
                      <option value="Doc">Doc</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      <img src={per} alt="email" />
                    </span>
                   
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={email} alt="email" />
                    </span>
                    <input type="email" className="form-control" id="inputEmail4" required />
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={pass} alt="password" />
                    </span>
                    <input type="password" className="form-control" id="inputPassword4" required />
                  </div>
                </div>
                <div className="col-12">
                   <p className="text-center">
                  <a href="#" onClick={toggleForgotPassword}>
                      Forgot Password?
                    </a>
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit}>
                    Log in
                  </button>
                  <a href={'/'} className="btn btn-primary mx-2 text-decoration-none">
                    Exit
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={toggleForgotPassword} />
    </div>
  );
};

export default Login;
