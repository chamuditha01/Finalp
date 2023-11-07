import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import supabase from '../../../../lib/helper/superbaseClient';

const Loginshop = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('Customer')
        .select('Customer_id, password')
        .eq('email', email);
  
      if (error) {
        throw error;
      }
  
      if (data.length === 1) {
        const user = data[0];
  
        if (user.password === password) {
         
          const cusId = user.Customer_id;
  
          
          navigate('/Homeshop', { state: { cusId } });
        } else {
          alert('Invalid password. Please try again.');
        }
      } else {
        alert('User with this email does not exist.');
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('An error occurred. Please try again.');
    }
  };
  


  return (
    <div className="authpage">
      <div className="authcont">
        <img
          src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
          alt="login"
        />

        <form className="authform">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h1>Login</h1>
            <a href="/" className="icon-link">
              <AiOutlineLogout className="icon" />
            </a>
          </div>

          <div className="formgroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to="/forgotpassword" className="stylenone">
            <p>Forgot password?</p>
          </Link>

          <button type="button" onClick={handleLogin}>
            LOG IN
          </button>

          <h2 className="or">OR</h2>

          <Link to="/signup" className="stylenone">
            <button type="submit" className="btn">
              Sign up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Loginshop;
