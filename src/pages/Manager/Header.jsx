import React from 'react';
import './dt.css';
import { BsJustify, BsFacebook, BsInstagram, BsSun } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTheme } from '../../ThemeProvider';
import { MdDarkMode } from 'react-icons/md';

function Header({ OpenSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme();

  const bars = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="bar"></div>
  ));

  return (
    <header className={`header11 ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <k className='icon' />
      </div>
      <div className='header-right'>
      
        <button className="icon-button icon" onClick={toggleDarkMode}>
          {darkMode ? <BsSun className="white-icon" /> : <MdDarkMode />}
        </button>
        <a href="/" className="icon-link">
          <button className="icon-button"><AiOutlineLogout className='icon ' /></button>
        </a>
      </div>
    </header>
  );
}

export default Header;
