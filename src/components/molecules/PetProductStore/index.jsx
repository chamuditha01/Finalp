import React, { useState } from 'react';
import img1 from './HC_Young_Kitten_Land_Gefluegel_BRB22_n_600x600.webp'
import img2 from './HC_Sterilised_Adult_Weide_Lamm_BRB22_600x600.webp'
import img3 from './Kit-Cat-Snow-Peas.jpg'
import img4 from './cat-playform-7.jpg'
import img5 from './HeavenlyHerbal_16oz_45bbc740-fc6c-4729-9790-877b9c12746c.webp'
import './CatCard.css'; 

import PopupForm from '../OrderForm';




function PetProductStore() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  
  const petProducts = [
    { id: img1, name: 'Pet Food', price: 1000 },
    { id: img2, name: 'Pet Toy', price: 500 },
    { id: img3, name: 'Pet Bed', price: 2000 },
    { id: img4, name: 'Pet Collar', price: 800 },
    { id: img5, name: 'Pet Shampoo', price: 1200 },
    { id: img1, name: 'Pet Toy', price: 1000 },
    { id: img3, name: 'Pet belt', price: 1700 },
    { id: img5, name: 'Pet Shampoo', price: 1200 },
    
    
  ];

  
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    const updatedTotal = total + product.price;
    setTotal(updatedTotal);
  };

 
  const handleCheckout = () => {
   
  };
  
 

  

  return (
    <div>
      <header>
        <h1>Pet Product Store</h1>
      </header>
      
      <main>
        {petProducts.map((product) => (
          <div>
          <div className="product" key={product.id}>
            <img src={product.id} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: Rs.{product.price}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button><br/>
            
            <PopupForm/>
            </div>
          </div>
          
        ))}
      </main>
          <center>
      <aside>
        <h2>Shopping Cart</h2>
        <ul id="cart">
          {cart.map((product) => (
            <li key={product.id}>
              {product.name} - Rs.{product.price}
            </li>
          ))}
        </ul>
        <p>Total: Rs.{total.toFixed(2)}</p>
        <button id="checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </aside>
      </center>
    </div>
  );
}


export default PetProductStore;