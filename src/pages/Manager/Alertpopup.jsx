import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import './dt.css';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const tableName = 'product1';

const supabase = createClient("https://kjrjrvwfyjngatmeinsk.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcmpydndmeWpuZ2F0bWVpbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3ODQ4MTcsImV4cCI6MjAxMjM2MDgxN30.6gqrC0IfJVrgS-Bipm9kf0bYP_g3r2y4dk4mfUK7o-M");

const Alertpopup = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: '',
    Description: '',
    department: '',
    price: '',
    productType: 'Cat items',
    image: '',
  });
  const [isAdding, setIsAdding] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.department && newProduct.phone && newProduct.image) {
      if (newProduct.id === null) {
        const { data, error } = await supabase.from(tableName).upsert([
          { ...newProduct, id: Date.now() },
        ]);
        if (error) {
          console.error('Error adding product:', error);
        } else {
          if (data) {
            setProducts([...products, data[0]]);
          }
        }
      } else {
        const { data, error } = await supabase.from(tableName).upsert([newProduct]);
        if (error) {
          console.error('Error updating product:', error);
        } else {
          if (data) {
            const updatedProductIndex = products.findIndex((p) => p.id === newProduct.id);
            if (updatedProductIndex !== -1) {
              products[updatedProductIndex] = data[0];
              setProducts([...products]);
            }
          }
        }
        
        
      }
    }setNewProduct({
          id: null,
          name: '',
          Description: '',
          department: '',
          price: '',
          productType: 'Cat items',
          image: '',
        });
        setIsAdding(false);
        fetchProducts();
  };

  const handleEditProduct = (product) => {
    setNewProduct({ ...product });
    setIsAdding(true);
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
      console.error('Error deleting product:', error);
    } else {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  return (
    <>
      <h1 className="h1">Product Management</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Product Type</th>
                <th>Product Price</th>
              </tr>
            </thead>
            <tbody>
              
              
               
              
             {products
  .filter((product) => parseInt(product.department) < 20)
  .map((product) => (
    <tr key={product.id}>
      <td>
        <img
          src={product.image}
          alt={product.name}
          width="50"
          height="50"
          style={{ objectFit: 'cover' }}
        />
      </td>
      <td>{product.name}</td>
      <td>{product.Description}</td>
      <td>{product.department}</td>
      <td>{product.productType}</td>
      <td>{product.price}</td>
      
    </tr>
  ))
}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Alertpopup;


