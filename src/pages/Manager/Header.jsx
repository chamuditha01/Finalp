import React from 'react'
import './dt.css'

import 
 {  BsJustify,BsFacebook,BsInstagram}
 from 'react-icons/bs'
 import { AiOutlineLogout } from 'react-icons/ai';

 


function Header({OpenSidebar}) {const bars = Array.from({ length: 10 }, (_, i) => (
  <div key={i} className="bar"></div>
));
  
  return (
    <header className='header11'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <k  className='icon'/>
        </div>
        <div className='header-right'>
        <div className="bars">{bars}</div>;
        <a href="https://web.facebook.com/dr.pethospital" className="icon-link"><button className="icon-button"><BsFacebook className='icon' /></button></a>
        <a href="https://www.instagram.com/dr.pet_hospital/?hl=en" className="icon-link"><button className="icon-button"><BsInstagram className='icon' /></button></a>
            <a href="/" className="icon-link"><button className="icon-button"><AiOutlineLogout className='icon' /></button></a>
            
        </div>
    </header>
  )
}

export default Header