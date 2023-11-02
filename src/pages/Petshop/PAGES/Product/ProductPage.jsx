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


const ProductPage = () => {
    const { prodid } = useParams()
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
      
    
    
    return (
        <div className='productpage'>
            

            <Navbar reloadnavbar={reloadnavbar}/>

            <div className='pc1'>
                <Link to='/Homeshop'>
                    <button className='goback'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Go Back
                    </button>
                </Link>


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