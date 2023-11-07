import React from 'react'
import BannerSlider from '../../COMPONENTS/Banners/BannerSlider'
import HomeCategories from '../../COMPONENTS/Category/HomeCategories'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './Home.css'
import ProductsSlider from '../../COMPONENTS/Product/ProductsSlider'
import Homeproduct from '../../COMPONENTS/Product/Homeproduct'
import { useLocation } from 'react-router-dom';


const Homeshop = () => {

  const location = useLocation();
  const cusId = location.state && location.state.cusId;

  alert(cusId)
  
  return (
    
    <div className='HOme'>
      <Navbar reloadnavbar={false}/>
      <BannerSlider />
      <HomeCategories />
      
      <Footer1 />

     <Homeproduct/>
      <Footer2 />
      
    </div>
    
  )
}

export default Homeshop