import React from 'react'
import 
{ BsGrid1X2Fill, BsFillArchiveFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src='./images/logo.jpg' className='icon_header'/> 
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/Manager">
                    <BsGrid1X2Fill className='icon'/> Pet Clinic
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/petshop">
                    <BsFillArchiveFill className='icon'/> Pet shop
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar