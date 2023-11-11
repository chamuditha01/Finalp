import React, { useState } from 'react'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import payneer from './Payoneer_logo.svg.png'
import './Cart.css'
import './Progress.css'
import './CartContainer.css'
import './ShippingContainer.css'
import './PaymentContainer.css'
import './OrderSucessfull.css'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import OrderSuccessful from '../../COMPONENTS/Order/OrderSuccessful'
import supabase from '../../../../lib/helper/superbaseClient';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const [productNames, setProductNames] = useState([]);
  const [subtotal, setsubtotal] = React.useState(0)
  const [shipping, setshipping] = React.useState(0)
  const [active, setactive] = React.useState(1)
  const [productImage, setProductImage] = useState('');
  const [tax, settax] = React.useState(0)
  const [deliverydate, setdeliverydate] = React.useState(
    new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )
  const [reloadnavbar, setreloadnavbar] = React.useState(false)
  const [cartdata, setCartData] = useState([]);
  const location = useLocation();
  const cusId = location.state && location.state.cusId;

  const checklogin = () => {
    return true
  }

  const orderItems = cartdata.map(item => ({
    orderId: item.Oder_Item_id,
    quantity: item.Order_Item_quantity,
    price: item.Order_price,
    orderDate: item.Order_Date,
    petProductId: item.pet_product_id,
    
  }));
 
  useEffect(() => {
   
    const fetchDataFromDatabase = async () => {
      try {
        const { data, error } = await supabase.from('Order_Item').select('*').eq('cusid', cusId).eq('status','n');
        if (error) {
          console.error('Error fetching data from the database:', error);
        } else {
          setCartData(data);
    
          let tempSubtotal = 0;
          const productImagePromises = [];
    
          data.forEach(item => {
            tempSubtotal += item.Order_price * item.Order_Item_quantity;
            const productImagePromise = supabase
              .from('product1')
              .select('image')
              .eq('id', item.pet_product_id)
              .then(result => {
                if (!result.error && result.data.length > 0) {
                  return result.data[0].image;
                  
                }
                return ''; 
              });
    
            productImagePromises.push(productImagePromise);
          });

          const productnamePromises = [];
    
          data.forEach(item => {
            
            const productnamePromise = supabase
              .from('product1')
              .select('name')
              .eq('id', item.pet_product_id)
              .then(result => {
                if (!result.error && result.data.length > 0) {
                  return result.data[0].name;
                  
                }
                return ''; 
              });
    
              productnamePromises.push(productnamePromise);
          });
    
          Promise.all(productImagePromises).then(imageUrls => {
            
            setProductImage(imageUrls);
          });
          Promise.all(productnamePromises).then(name => {
            
            setProductNames(name);
          })
          setsubtotal(tempSubtotal);
        }
      } catch (error) {
        console.error('Error in fetchDataFromDatabase:', error);
      }
    };
    
   
    fetchDataFromDatabase();
  }, []);

  const deleteCartItem = async (item) => {
    try {
      
  
      const { error } = await supabase.from('Order_Item').delete().eq('Oder_Item_id', item.Oder_Item_id);
      if (error) {
        console.error('Error deleting item:', error);
      } else {
        console.log('Item deleted successfully');
  
        
        const { data: productData, error: productError } = await supabase
          .from('product1')
          .select('department')
          .eq('id', item.pet_product_id); 
  
        if (productError) {
          console.error('Error fetching product data:', productError);
        } else {
          
  
          
          const newQuantity = productData[0].department + item.Order_Item_quantity;
  
          
          const { error: updateError } = await supabase
            .from('product1')
            .upsert([
              {
                id: item.pet_product_id, 
                department: newQuantity,
              },
            ]);
  
          if (updateError) {
            console.error('Error updating product quantity:', updateError);
          } else {
            console.log('Product quantity updated successfully');
           
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error('Error in deleteCartItem:', error);
    }
  };
  
  

  async function handleProceed() {
    try {
      const appointmentDate = new Date();
      
      appointmentDate.setDate(appointmentDate.getDate() + 1);
     
      const { data, error } = await supabase.from("Order").upsert([
        {
          Order_Date: appointmentDate,
          Order_Total_Amount: subtotal,
          Order_Payment: subtotal,
          address:address,
          cusid: cusId,
          
        },
      ]);
  
      if (error) {
       console.error("Error saving appointment:", error);
      } else {
        console.error("oredr saved successfully.");
  
        const { data: lastInsertedRecord, error: lastInsertedError } = await supabase
          .from("Order")
          .select("Order_id")
          .order("Order_id", { ascending: false })
          .limit(1);
  
        if (lastInsertedError) {
          console.error("Error fetching the last inserted ID:", lastInsertedError);
        } else {
          const insertedAppointmentId = lastInsertedRecord[0].Order_id;
          console.error(insertedAppointmentId);
          handleitem(insertedAppointmentId)
          
        }
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  }
  async function handleitem(insertedAppointmentId) {
    try {
    
  
      const { data, error } = await supabase
        .from("Order_Item")
        .update({ status: insertedAppointmentId })
        .eq('cusid', cusId)
        .eq('status', 'n');
  
      if (error) {
        console.error('Error updating Order_Item status:', error);
      } else {
       console.error('Order_Item status updated successfully');
        setactive(4)
      
      }
    } catch (error) {
      console.error('Error updating Order_Item status:', error);
    }
  }
  
 

  
  
  

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  
  const [address, setAddress] = useState('');
  const [selectedorderid, setselectedorderid] = useState(0)
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(orderSuccessfulProvider)
  return (
    <div>
      <Navbar cusId={cusId} reloadnavbar={reloadnavbar} />
      {
        ordersuccesscont && <OrderSuccessful orderid={selectedorderid} message={`Order Placed Successfully, Order ID: ${selectedorderid}`}  redirecto='userorders'/>
      }
      <SingleBanner
        heading="My Cart"
        bannerimage='https://cdn.pixabay.com/photo/2018/09/02/17/00/book-3649213_1280.jpg'
      />
      <div className='cart'>
        <div className='progress'>
          {
            active == 1 ?
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span>My Cart</span>

              </div>
              :
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span>My Cart</span>
              </div>
          }


          {
            active == 2 ?
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <span>Shipping</span>

              </div>
              :
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <span>Shipping</span>
              </div>
          }

          {
            active == 3 ?
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>


                <span>Payment</span>

              </div>
              :
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>

                <span>Payment</span>
              </div>
          }
          {
            active == 4 ?
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin() 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>

                <span>Success</span>

              </div>
              :
              <div className='c11'
                onClick={() => {
                  cartdata.length > 0 && checklogin()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>


                <span>Success</span>
              </div>
          }
        </div>

        {
          active == 1 &&
          <div className='cartcont'>
            
            {
              cartdata.length > 0 ?
                <table className='carttable'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartdata.map((item, index) => {
                        return (
                          <tr key={index} className="cartitemrow">
                            <td data-label="Product"
                            >
                              <div className='cartproduct'
                                onClick={() => {
                                  window.location.href = `/product/${item.pet_product_id}`
                                }}
                              >
                                
                                  
                                <p>{
                                  item.pet_product_id
                                }</p>
                              </div>
                            </td>
                            
                              {productNames[index] && (
                                <td style={{padding:'4px'}} data-label="Image">
                                  {productNames[index]}
                                 </td> 
                              )}
                           
                            <td data-label="Image">
                              {productImage[index] && (
                                <img
                                style={{marginLeft:'15px'}}
                                  src={productImage[index]}
                                  alt='Product Image'
                                  width='100'
                                  height='100'
                                />
                              )}
                            </td>
                            <td
                              data-label="Quantity"
                            >
                              <div className='quantity'>
                                
                                <span>{item.Order_Item_quantity}</span>
                                
                              </div>
                            </td>

                            <td
                              data-label="Price"
                            >
                              <p>
                                Rs {item.Order_price}
                              </p>
                            </td>

                            <td>
                              <p>Rs {
                                item.Order_price * item.Order_Item_quantity
                              }</p>
                            </td>

                            <td
                              data-label="Remove"
                            >
                              <div className='delbtn'
                                onClick={() => {
                                  deleteCartItem(item); 
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }

                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Sub-Total</td>
                      <td className='totaltableright'>
                        Rs {subtotal.toFixed(2)}
                      </td>
                    </tr>
                    
                    
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Net-Total</td>
                      <td className='totaltableright'>
                        Rs {( subtotal ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                :
                <div className='emptycart'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>

                  <p>Your cart is empty</p>
                </div>
            }
          </div>
        }

        {
          active == 2 &&
          <div className='shippingcont' style={{width:'760px'}}>
            
            <div className='previous'>
              <h2 className='mainhead1'> Address & Zip code</h2>
              
            </div>
            
            <div className='shippingadd' >
              <input style={{width:'500px'}} type='text' placeholder='Address' onChange={handleAddressChange}/>
              
              <input style={{width:'500px'}} type='text' placeholder='Postal Code' />
              <button>Save</button>
            </div>

          </div>
        }
        {
          active == 3 &&
          <div className='paymentcont'>
            <h2 className='mainhead1'>Select Payment Method</h2>
            <div className='paymenttypes'>
              <div className='c1'>
                <input type='radio' name='payment' id='payment1' required/>
                <img src='https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png'
                  alt='paypal'
                />
              </div>
              <div className='c1'>
                <input type='radio' name='payment' id='payment1' />
                <img style={{height:'40px',marginTop:'-5px'}} src={payneer}
                  alt='paypal'
                />
              </div>
              <div className='c1'>
                <input type='radio' name='payment' id='payment1' />
                <img src='https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png'
                  alt='paypal'
                />
              </div>
            </div>

            <div
              className='paymentagreement'
            >
              <input type='checkbox' name='agreement' id='agreement' required/>
              <label htmlFor='agreement'>I agree to the terms and conditions</label>
            </div>

            <div className='c2'>
              <span>Net Total</span>
              &nbsp;&nbsp;
              <span>Rs {(subtotal + tax + shipping).toFixed(2)}</span>
            </div>
          </div>
        }
        {
          active == 4 &&
          <div className='ordersuccessfull' style={{width:'760px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>

            <h2 className='mainhead1'>Order Placed Successfully</h2>
            <p>Thank you for shopping with us</p>
            <span>Order ID : 12345</span>
          </div>
        }




        
        {
          active == 1 && cartdata.length > 0 &&
          <div className='btns'>
            <button className='nextbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                checklogin() && setactive(2)
              }}
            >Next</button>
          </div>
        }

        {
          active == 2 &&
          <div className='btns'>
            <button className='backbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                checklogin() && setactive(1)
              }}
            >Back</button>
            <button className='nextbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                checklogin() && setactive(3)
              }}
            >Next</button>
          </div>
        }

        {
          active == 3 &&
          <div className='btns'>
            <button className='backbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                checklogin() && setactive(2)
              }}
            >Back</button>
            <button type="submit" className='nextbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                handleProceed() 
              }}
            >Proceed</button>
          </div>
        }
        {
          active == 4 &&
          <div className='btns'>
            
            <button className='nextbtn' style={{backgroundColor:'blue'}}
            ><a href='/Homeshop' style={{textDecoration:'none'}}>Go Back</a></button>
          </div>
        }
      </div>
      <Footer1 />
      <Footer2 />
    </div>
  )
}

export default Cart