
import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import Navbarprofile from './components/molecules/Navbarprofile';
import Manager from './pages/Manager/Manager';
import Petshop from './pages/Manager/Petshop';
import ClickProfile from './pages/ClickProfile';
import PopupForm from './components/molecules/OrderForm';
import ViewProfile from './components/molecules/ViewProfile';
import EditProfile from './components/molecules/EditProfile';
import DoctorPage from './pages/DoctorPage';
import DoctorNot from './components/atoms/DoctorNot';
import Cart from './components/molecules/Payment';


function App() {
  return (
    <div className="App">
      <div >
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/service" element={<Service/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/navbarprofile" element={<Navbarprofile/>} />
      <Route path="/Manager" element={<Manager/>} />
      <Route path="/petshop" element={<Petshop/>} />
      <Route path="/ClickProfile" element={<ClickProfile/>}/>
      <Route path="/PopupForm" element={<PopupForm/>}/>
      <Route path="/ViewProfile" element={<ViewProfile/>}/>
      <Route path="/EditProfile" element={<EditProfile/>}/>
      <Route path="/DoctorPage"  element={<DoctorPage/>}/>
      <Route path="/DoctorNot" element={<DoctorNot/>}/>
      <Route path="/Cart"  element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
    </div>
    
  );
}

export default App;
