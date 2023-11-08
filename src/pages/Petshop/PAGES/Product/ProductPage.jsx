import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import img1 from '../../ASSETS/Images/happy-dog-naturcroq-chicken-and-rice-dry-dog-food-happy-pet-491603_640x.webp'
import img2 from '../../ASSETS/Images/71xCoqZkdkL._SL1500_.jpg'
import img3 from '../../ASSETS/Images/A-10kg_large.webp'
import img4 from '../../ASSETS/Images/4.png'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import ProductsSlider from '../../COMPONENTS/Product/ProductsSlider'
import './ProductPage.css'
import { useState } from 'react'
import supabase from '../../../../lib/helper/superbaseClient'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
    
    const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const { prodid } = useParams()
const cusId = searchParams.get('cusId');
    const [imageset, setimageset] = React.useState(null)
    const [productdata, setproductdata] = React.useState([])
    const [activeimg, setactiveimg] = React.useState({})
    const [count, setcount] = React.useState(1)
    const [showreview, setshowreview] = React.useState(false)
    const [productData, setProductName] = React.useState(false)
    const [reloadnavbar, setreloadnavbar] = React.useState(false)
    const [productName, setproductName] = React.useState(false)
    const [productPrice, setproductPrice] = React.useState(false)
    const [productImage, setProductImage] = React.useState(false)
    const [productDescription, setProductDescription] = React.useState(false)


    const addtocart = async () => {
        try {
          
          const { data: productData, error: fetchError } = await supabase
            .from('product1')
            .select('department')
            .eq('id', prodid);
      
          if (fetchError) {
            alert('Error fetching product quantity:', fetchError);
            toast.error('Failed to fetch product quantity');
            return;
          }
      
          const currentQuantity = productData[0]?.department || 0;
      
       
          const updatedQuantity = currentQuantity - count;
      
          
          if (updatedQuantity < 0) {
            alert('Insufficient quantity available for this product');
            toast.error('Insufficient quantity available');
            return;
          }
      
          
          const updateResult = await supabase
            .from('product1')
            .upsert(
              [
                {
                  id: prodid,
                  department: updatedQuantity,
                },
              ],
              { onConflict: ['id'] }
            );
      
          if (updateResult.error) {
            alert('Error updating product quantity:', updateResult.error);
            toast.error('Failed to update the product quantity');
            return;
          }
      
          
          const orderData = {
            Order_Item_quantity: count,
            Order_price: productPrice,
            Order_Date: new Date().toISOString(),
            pet_product_id: prodid,
            cusid:cusId,
            status:'n'
          };
      
          
          const { data: order, error: orderError } = await supabase
            .from('Order_Item')
            .insert([orderData]);
      
          if (orderError) {
            alert('Error saving order:', orderError);
            toast.error('Failed to save the order');
            return;
          }
      
          alert('Order added to the database, and product quantity updated');
         
        } catch (error) {
          alert('Error adding to cart:', error);
          toast.error('Failed to add to cart');
        }
      };
    
    useEffect(() => {
        
        async function fetchProducts() {
          const { data, error } = await supabase
            .from('product1')
            .select('image, price, name,Description')
            .eq('id', prodid);
      
          if (error) {
            console.error('Error fetching products:', error);
          } else if (data.length > 0) {
            const productData = data[0];
            const productName = productData.name;
            const productPrice = productData.price;
            const productImage = productData.image; 
            const productDescription = productData.Description
      
            
            setproductName(productName);
            setproductPrice(productPrice);
            setProductImage(productImage); 
            setProductDescription(productDescription);
          }
        }
      
        fetchProducts();
        window.scrollTo(0, 0);
      }, []);
      
      const navigate = useNavigate(); 

  const handlelink = () => {
    
    navigate('/Homeshop', { state: { cusId } });
  };
    
    
    return (
        <div className='productpage'>
            

            <Navbar cusId={cusId} reloadnavbar={reloadnavbar}/>

            <div className='pc1'>
               
                    <button className='goback' onClick={handlelink}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Go Back
                    </button>
                


                <div className='c11'>
                    <div className='imgset'>
                        
                    </div>
                    <div className='imgbig'>
                        <img style={{objectFit: 'cover'}} src={productImage} alt="" />
                    </div>
                </div>

                <div className='c12'>
                <h1 className=''>{productName}</h1>
                

                    <div className='c121'>
                        <p className='price'>
                            Rs. {productPrice * count}
                        </p>

                        <div className='incrdecr'>
                            <button style={{color:'black'}}
                                onClick={() => {
                                    if (count > 1) {
                                        setcount(count - 1)
                                    }
                                }}
                            >-</button>
                            <p>{count}</p>
                            <button style={{color:'black'}}
                                onClick={() => {
                                    if (count < 10) {
                                        setcount(count + 1)
                                    }
                                }}
                            >+</button>
                        </div>
                    </div>

                    <div className='btncont'>
                        <button style={{backgroundColor:'blue'}}
                            onClick={() => {
                                addtocart()
                            }}
                        >
                            Add to Cart
                        </button>
                        <button style={{backgroundColor:'blue'}}
                            onClick={() => {
                                alert('Buy Now')
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                   <h3 style={{marginTop:'10px'}}>{productDescription}</h3> 
                </div>
                
            </div>
            <div className='pc2'>
                {
                    showreview ?
                        <div className='tabs'>
                            <button
                                className='inactive'

                                onClick={
                                    () => {
                                        setshowreview(false)
                                    }
                                }
                            >Description</button>
                            
                        </div>
                        :
                        <div className='tabs'>
                            

                            
                        </div>
                }
                
            </div>

            
            <Footer1 />
            <Footer2 />
        </div>
    )
}

export default ProductPage