import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import Navbarprofile from "./components/molecules/Navbarprofile";
import Manager from "./pages/Manager/Manager";
import Petshop from "./pages/Manager/Petshop";
import ClickProfile from "./pages/ClickProfile";
import PopupForm from "./components/molecules/OrderForm";
import ViewProfile from "./components/molecules/ViewProfile";
import EditProfile from "./components/molecules/EditProfile";
import DoctorPage from "./pages/DoctorPage";
import DoctorNot from "./components/atoms/DoctorNot";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPage from "./pages/Petshop/PAGES/Product/ProductPage";
import About from "./pages/Petshop/PAGES/Extra/About";
import Contact from "./pages/Petshop/PAGES/Extra/Contact";
import Loginshop from "./pages/Petshop/PAGES/Auth/Loginshop";
import Signup from "./pages/Petshop/PAGES/Auth/Signup";
import FAQ from "./pages/Petshop/PAGES/Extra/FAQ";
import Cart from "./pages/Petshop/PAGES/Cart/Cart";
import UserProfile from "./pages/Petshop/PAGES/User/UserProfile";
import ForgotPassword from "./pages/Petshop/PAGES/Auth/ForgotPassword";
import Termsandconditions from "./pages/Petshop/PAGES/Extra/Termsandconditions";
import PrivacyPolicy from "./pages/Petshop/PAGES/Extra/PrivacyPolicy";
import Homecat from "./pages/Petshop/PAGES/Catitems/Catitemsproducts";
import Homedog from "./pages/Petshop/PAGES/Dogitems/Dogitemsproducts";
import Homeother from "./pages/Petshop/PAGES/Otheritems/Otheritemsproducts";
import Homeshop from "./pages/Petshop/PAGES/HomePage/Home";
import { RecoilRoot } from "recoil";
import Notify from "./components/molecules/Notification";


function App() {
  return (
    <div className="App">
      <div>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/service" element={<Service />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/navbarprofile" element={<Navbarprofile />} />
              <Route path="/Manager" element={<Manager />} />
              <Route path="/petshop" element={<Petshop />} />
              <Route path="/ClickProfile" element={<ClickProfile />} />
              <Route path="/PopupForm" element={<PopupForm />} />
              <Route path="/ViewProfile" element={<ViewProfile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/DoctorPage" element={<DoctorPage />} />
              <Route path="/DoctorNot" element={<DoctorNot />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
              <Route path="/Homeshop" element={<Homeshop />} />
              <Route path="/product/:prodid" element={<ProductPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/loginshop" element={<Loginshop />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user/:activepage" element={<UserProfile />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/termsandconditions" element={<Termsandconditions />}/>
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/Homecat" element={<Homecat />} />
              <Route path="/Homeother" element={<Homeother />} />
              <Route path="/Homedog" element={<Homedog />} />
              <Route path="/Notify" element={<Notify/>}/>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </div>
  );
}

export default App;
