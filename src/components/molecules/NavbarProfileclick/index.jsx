import NavItems from "../../atoms/Navitems";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import logo from './logo.jpg'
import per from './dog.png'
import Menu from "../../atoms/MenuItems";
import PopupForm from "../OrderForm";

function NavbarProfileclick() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar ">
        <div className="container-fluid">
         
          <a className="navbar-brand" href="/">
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
              <NavItems NavItem id={"nav"} name={'Home'} path={'/Profile'} />
              
              <PopupForm/>
              <li className="nav-item dropdown">
                <a
                style={{marginTop:'8px'}}
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Menu
                </a>
                <ul className="dropdown-menu">
                  
                  <Menu name={'Donate'} path='/Donate'></Menu>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <Menu name={'Appointment'} path='/Appointment'></Menu>
                  
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 right">
             
              
              
              
              
              
              <div class="btn-group">
                <button type="button" class="btn btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img style={{marginRight:'15%'}} id="per" src={per} alt="" />
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/ViewProfile">Veiw Profile</a></li>
                  <li><a class="dropdown-item" href="/EditProfile">Edit Profile</a></li>
                  <li><a class="dropdown-item" href="/ClickProfile">Jessy</a></li>
                  <li><a class="dropdown-item" href="/ClickProfile">Shadow</a></li>
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="/Profile">log out</a></li>
                </ul>
              </div>
              
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarProfileclick;
