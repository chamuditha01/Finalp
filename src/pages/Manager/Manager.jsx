import { useState, useEffect } from 'react'
import './home.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home11 from './Home11'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 



function Manager() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const location = useLocation();
  const manager_id = location.state && location.state.manager_id ;
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
     
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <Home11/>
    
     
    </div>
  )
}

export default Manager