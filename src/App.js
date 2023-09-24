
import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Service from './pages/Service';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import Navbarprofile from './components/molecules/Navbarprofile';

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
      </Routes>
      </BrowserRouter>
     
    </div>
    </div>
    
  );
}

export default App;
