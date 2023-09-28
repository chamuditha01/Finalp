import React from 'react'
import './dt.css'
import 
 {BsFillBellFill, BsFillEnvelopeFill,  BsSearch, BsJustify}
 from 'react-icons/bs'
 import { AiOutlineLogout } from 'react-icons/ai';
 


function Header({OpenSidebar}) {
  
  return (
    <header className='header11'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <k  className='icon'/>
        </div>
        <div className='header-right'>
            <a href="/"><BsFillBellFill className='icon'/></a>
            <a href="/" className="icon-link"><button className="icon-button"><AiOutlineLogout className='icon' /></button></a>
            
        </div>
    </header>
  )
}

export default Header