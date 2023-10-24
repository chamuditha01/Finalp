import './index.css';
import email from './email.png';
import pass from './password.png';
import per from './person.png';
import image2 from './cbak2.jpg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ForgotPasswordModal from '../popup';
import supabase from '../../lib/helper/superbaseClient';

const Login = () => {
  const navigate = useNavigate(); 
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('Manager');
  const [newEmployee, setNewEmployee] = useState({
    Email: '',
    Passward: '',
    Manager_id:''
   
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
    

  const toggleForgotPassword = () => {
    setForgotPasswordOpen(!forgotPasswordOpen);
  };  const handleUsernameChange = (e) => {
    setSelectedUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    
    
    
 
    if (selectedUsername ) {
      if (selectedUsername === 'Manager') {
        handleloginEmployee()
        
        
      } else if (selectedUsername === 'PetOwner') {
        handleLoginOwner();
        
      } else if (selectedUsername === 'Doc') {
        handleloginDoctor();
        
      }
      
    } else {
      alert('Please fill in all required fields.');
    }
     
 
  };

  const handleLoginOwner = async () => {
    try {
      const { data: customerData, error: customerError } = await supabase
        .from('Customer')
        .select('Customer_id')
        .eq('email', newEmployee.Email);
  
      if (customerError) {
        alert('Error: ' + customerError.message);
        return;
      }
  
      if (customerData && customerData.length > 0) {
        const customerId = customerData[0].Customer_id;
  
        const { data: ownerData, error: ownerError } = await supabase
          .from('Pet_Owner1')
          .select('password')
          .eq('id', customerId);
  
        if (ownerError) {
          alert('Error: ' + ownerError.message);
          return;
        }
  
        if (ownerData && ownerData.length > 0) {
          const ownerPassword = ownerData[0].password;
  
          if (ownerPassword === newEmployee.Passward) {
            navigate('/Profile');
          } else {
            alert('Wrong password');
          }
        } else {
          alert('No user found with that email.');
        }
      } else {
        alert('No user found with that email.');
      }
    } catch (error) {
      alert('An error occurred: ' + error);
    }
  };
  
  

  const handleloginDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('Doctor')
        .select('Passward')
        .eq('Email', newEmployee.Email); 
  
      if (error) {
        alert('Error: ' + error.message); 
        return;
      }
  
      if (data && data.length > 0) {
        const pass = data[0].Passward;
        if(pass===newEmployee.Passward){
          navigate('/DoctorPage');
        }
        else{
          alert('wrong passward')
        }
      } 
    else {
        alert('No user found with that email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  const handleloginEmployee = async () => {
    try {
      const { data, error } = await supabase
        .from('Manager')
        .select('Passward')
        .eq('Email', newEmployee.Email); 
  
      if (error) {
        alert('Error: ' + error.message); 
        return;
      }
  
      if (data && data.length > 0) {
        const pass = data[0].Passward;
        if(pass===newEmployee.Passward){
          navigate('/Manager');
        }
        else{
          alert('wrong passward')
        }
      } 
    else {
        alert('No user found with that email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
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
                    
                  </div>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      <img src={per} alt="email" />
                    </span>
                   <select
                      className="form-select"
                      id="validationDefaultUsername"
                      value={selectedUsername}
                      onChange={handleUsernameChange}
                      style={{fontSize:'13px'}}
                    >
                      <option style={{fontSize:'13px'}} value="Manager">Manager</option>
                      <option style={{fontSize:'13px'}} value="PetOwner">PetOwner</option>
                      <option style={{fontSize:'13px'}} value="Doc">Doc</option>
                    </select>
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
                    <input type="email" className="form-control" id="Email" name='Email' onChange={handleInputChange} required />
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
                    <input type="password" className="form-control" id="Passward" name='Passward' onChange={handleInputChange} required />
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
                  <a href={'/'} className="btn btn-primary mx-2 text-decoration-none " style={{paddingTop:'20px'}}>
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
