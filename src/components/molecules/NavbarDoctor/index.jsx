import NavItems from "../../atoms/Navitems";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import logo from './logo.jpg'
import per from './login.png'

function NavbarDoctor() {
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
              <NavItems NavItem id={"nav"} name={'Home'} path={'/'} />
               
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 right">
            <p id="dr">Hello Dr.Kasun</p>
              <div class="btn-group">
                <button type="button" class="btn btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img style={{marginRight:'15%'}} id="per" src={per} alt="" />
                </button>
                <ul class="dropdown-menu">
                  
                  <li><a class="dropdown-item" href="/EditProfile">Profile</a></li>
                  
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="/">log out</a></li>
                </ul>
              </div> 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarDoctor;
