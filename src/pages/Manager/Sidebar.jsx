import React, { useState } from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill } from 'react-icons/bs';
import { useTheme } from '../../ThemeProvider';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { darkMode, toggleDarkMode, colorMode, changeColorMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <aside id="sidebar" className={`main-container ${darkMode ? 'dark-mode' : 'light-mode'} ${openSidebarToggle ? 'sidebar-responsive' : ''}`}>
      
        <div className='sidebar-title'>
          <div className='sidebar-brand'>
            <a href="/"><img style={{ width: '50px', height: '50px', borderRadius: '40px' }} src='./images/logo.jpg' className='icon_header' /> </a>
          </div>
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
            <a href="/Manager">
              {isLoading ? (
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <BsGrid1X2Fill className='icon' /> Pet Clinic
                </>
              )}
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="/petshop" onClick={simulateLoading}>
              {isLoading ? (
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <BsFillArchiveFill className='icon' /> Pet shop
                </>
              )}
            </a>
          </li>
        </ul>

    </aside>
  );
}

export default Sidebar;
