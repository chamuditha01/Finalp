import Navbar from "../Navbar";
import React, { useState } from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import FormItems from "../../atoms/FormItems";

const FormLogin = () => {
 const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <h1 style={{textAlign: 'center',marginTop: '80px'}}>Log In</h1>
      <center>
        <form
          style={{
            width:'300px',
            borderTopWidth: '5px',
            borderRadius: '10px',
            borderTopStyle: 'solid',
            marginTop: '40px',
            backgroundColor: '#a7b6f9',
            borderTopColor: '#000080',
            borderBottom: '30px',
            borderBottomStyle: 'solid',
            borderLeft:'4px',
            borderRight:'4px',
            borderLeftStyle:'solid',
            borderRightStyle:'solid',
            marginBottom:'100px',
            
          }}
          className="row g-3"
        >
          
            <FormItems name={'Email'} type={'text'} placeholder={'zehan@gmail.com'}/>
          
          <center><div className="col-md-12">
            <label style={{color: '#000080'}} htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
                
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
                Log In
              </button>
            </div>
          </center>
        </form>
      </center>
    </div>
    
  );
}

export default FormLogin;
