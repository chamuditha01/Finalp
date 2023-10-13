import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'

const Loginshop = () => {
  return (
    <div className='authpage'>
      <Navbar reloadnavbar={false} />

      <div className='authcont'>
        <img src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
          alt='login' />

        <form className='authform'>
          <h1>Login</h1>
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
          
            <button type="submit"><a href="/Homeshop">Login</a></button>
          
          <h2 className='or'>OR</h2>
          <Link to='/signup' className='stylenone'>
            <button type='submit' className='btn'>Signup</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Loginshop;
