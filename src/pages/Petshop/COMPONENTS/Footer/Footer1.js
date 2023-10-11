import React from 'react'
import veges from './pexels-helena-lopes-1378849.jpg'
import './Footer1.css'
const Footer1 = () => {
    return (
        <div className='footer1'>
            <div className='left'>
                <img src={veges} alt='veges' />
            </div>
            <div className='right'>
                <h1>Welcome to our pet store
                </h1>
                <p>
                    
                    ..We deliver foods and medicines in island wide..
                    
                </p>
            </div>
        </div>
    )
}

export default Footer1