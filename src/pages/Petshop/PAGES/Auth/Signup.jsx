import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
const Signup = () => {
    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false}/>

            <div className='authcont'>
                <img src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
                    alt='signup' />

                <form className='authform'>
                    <h1>Signup</h1>
                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='fname'>First Name</label>
                            <input type='text' id='fname' required/>
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='lname'>Last Name</label>
                            <input type='text' id='lname' required />
                        </div>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' required/>
                    </div>

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' required/>
                        </div>
                        <div className='formgroup'>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input type='password' id='cpassword' required/>
                    </div>
                    </div>

                    <Link to='/loginshop'
                        className='stylenone'
                    >
                        <p>Already have an account?</p>
                    </Link>
                    <button type='submit' className='btn'>Signup</button>
                    <Link to='/Homeshop'
                        className='stylenone'
                    >
                        <button className='btn'>back</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Signup