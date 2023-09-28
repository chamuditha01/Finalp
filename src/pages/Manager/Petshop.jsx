import { useState } from 'react'
import './home.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Phome11 from './Phome11'



function Petshop() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <Phome11/>
     
    </div>
  )
}

export default Petshop