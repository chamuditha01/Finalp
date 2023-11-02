import React, { useEffect, useState } from 'react';
import ProductCard from '../../COMPONENTS/Product/ProductCard';

import supabase from '../../../../lib/helper/superbaseClient';



const HomeProduct = () => {

 const [products, setProducts] = useState([]);
 

  useEffect(() => {
    
    async function fetchProducts() {
      const { data, error } = await supabase.from('product1').select('id,image, price, name');

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
     
     
      
      

      <div className="products">
        {products.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
     
      
    </div>
  )
}

export default HomeProduct


