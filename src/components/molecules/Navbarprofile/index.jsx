import NavItems from "../../atoms/Navitems";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navprofile.css';
import logo from './logo.jpg'
import per from './login.png'

function Navbarprofile() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
         
          <a className="navbar-brand" href="/profile">
            <img src={logo} alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavItems NavItem id={"nav"} name={'Home'} path={'/profile'} />
              <NavItems NavItem id={"nav"} name={'Service'} path={'/profile'} />
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Pet shop
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Donation
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 right">
             
              <NavItems NavItem id={"nav"} name={'Register'} path={'/profile'} />
              
              <NavItems NavItem id={"nav"} name={'Log Out'} path={'/'}  />
              <a className="top" href="/">
              <img src={per} alt="" /></a>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbarprofile;
