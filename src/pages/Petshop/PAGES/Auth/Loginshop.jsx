import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

const Loginshop = () => {

  const navigate = useNavigate();

  const handlelog = () =>{
    navigate('/Homeshop');
  }

  

  return (
    <div className='authpage'>
      

      <div className='authcont'>
        <img src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
          alt='login' />

        <form className='authform'>
          <div style={{display:'flex',flexDirection:'row'}}><h1>Login</h1><a href="/" className="icon-link"><AiOutlineLogout className='icon' /></a></div>
          <div className='formgroup'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' required />
          </div>

          <div className='formgroup'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' required />
          </div>

          <Link to='/forgotpassword' className='stylenone'>
            <p>Forgot password?</p>
          </Link>
          
            <button  onClick={handlelog}>LOG IN</button>
          
          <h2 className='or'>OR</h2>
          <Link to='/signup' className='stylenone'>
            <button type='submit' className='btn'>Sign up</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Loginshop;
