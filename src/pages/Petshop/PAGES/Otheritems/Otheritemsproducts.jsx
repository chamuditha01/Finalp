import React, { useEffect, useState } from 'react';
import ProductCard from '../../COMPONENTS/Product/ProductCard';
import './Home.css';
import supabase from '../../../../lib/helper/superbaseClient';
import ProductsSlider from '../../COMPONENTS/Product/ProductsSlider'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import BannerSlider from '../../COMPONENTS/Banners/BannerSlider'


const Homeother = () => {

 const [products, setProducts] = useState([]);
 const type="Other items";

  useEffect(() => {
    
    async function fetchProducts() {
      const { data, error } = await supabase.from('product1').select('id,image, price, name').eq('productType', type);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div className='HOme'>
      <Navbar reloadnavbar={false}/>
      <BannerSlider />
     
      
      <Footer1 />

      <div className="products">
        {products.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
     
      <Footer2 />
    </div>
  )
}

export default Homeother


