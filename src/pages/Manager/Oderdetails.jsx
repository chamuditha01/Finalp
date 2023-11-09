import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import './dt.css';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const tableName = 'product1';

const supabase = createClient("https://kjrjrvwfyjngatmeinsk.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcmpydndmeWpuZ2F0bWVpbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3ODQ4MTcsImV4cCI6MjAxMjM2MDgxN30.6gqrC0IfJVrgS-Bipm9kf0bYP_g3r2y4dk4mfUK7o-M");

const Oderdetails = () => {
  const [products, setProducts] = useState([]);
 
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };

  

  return (
    <>
      <h1 className="h1">Oder details</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Product Id</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Cus Id</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Oderdetails;


