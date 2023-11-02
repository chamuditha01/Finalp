import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductCard.css';
import supabase from '../../../../lib/helper/superbaseClient';

const ProductCard = ({ data }) => {
  const [show, setshow] = useState(false);
  const [count, setCount] = useState(1);

  const updateTotalPrice = () => {
    return data.price * count;
  };


  const addtocart = async () => {
    try {
      const orderData = {
        Order_Item_quantity: count,
        Order_price: updateTotalPrice(),
        Order_Date: new Date().toISOString(),
        pet_product_id: data.id,
      };

      const { data: order, error } = await supabase.from('Order_Item').insert([orderData]);

      if (error) {
       alert('Error saving order to the database:', error);
        toast.error('Failed to save the order to the database');
      } else {
        alert('Order added to the database');
      }
    } catch (error) {
      alert('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className='product'>
      <div className='s1'>
      <img src={data.image} alt={data.name} />
      </div>
      <div style={{backgroundColor:'wheat', width:'100%'}}>
      <div style={{marginTop:'14px'}} className='s2'>
        <h3>
          Rs. {
            data.price 
          }
          
        </h3>
        <h3>{data.name}</h3>
      </div>
      <div className='s3'>
        <p>{data.counttype}</p>
      </div>
      {
        show ?
          <div className='addbtn'>
            <div className='qty'>
              <button
              style={{color:'black'}}
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1)
                  }
                }}
              >-</button>
              <p>{count}</p>
              <button style={{color:'black'}}
                onClick={() => setCount(count + 1)}
              >+</button>
            </div>
            <button className='addtocart' id="addtocart"
              onClick={() => {
                setshow(false)
                
                addtocart()
              }}
            >
              Add to cart
            </button>
          </div>
          :
          <div className='addbtn'>
            <Link
              to={`/product/${data.id}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
              onClick={() => setshow(true)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

          </div>
      }</div>
    </div>
  )
}

export default ProductCard;    