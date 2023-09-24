
import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import Navbarprofile from './components/molecules/Navbarprofile';
import CatProduct from './pages/CatItem';
import LogIn1 from './pages/LogIn1';
import SignIn1 from './pages/SignIn';
import Home1 from './pages/Home1';
import DogProduct from './pages/DogItem';

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
      <Route path='/shop' element={<Home1/>}/>
      <Route path="/SignIn" element={<SignIn1/>}/>
      <Route path="/LogIn" element={<LogIn1/>}/>
      <Route path="/Cat" element={<CatProduct/>}/>
      <Route path="/Dog" element={<DogProduct/>}/> 
      </Routes>
      </BrowserRouter>
     
    </div>
    </div>
    
  );
}

export default App;
