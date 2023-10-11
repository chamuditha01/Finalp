import React, { useState } from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  // Step 2: Create a state variable to track loading
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate loading (you can replace this with your actual loading logic)
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second loading time
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <a href="/"><img style={{ width: '50px', height: '50px', borderRadius: '40px' }} src='./images/logo.jpg' className='icon_header' /> </a>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/Manager">
            {/* Step 3: Conditionally render loading spinner */}
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
            {/* Step 3: Conditionally render loading spinner */}
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
  )
}

export default Sidebar;
