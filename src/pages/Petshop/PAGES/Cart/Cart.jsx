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

const Cart = () => {
  const [cartdata, setcartdata] = React.useState([])
  const [subtotal, setsubtotal] = React.useState(0)
  const [shipping, setshipping] = React.useState(0)
  const [active, setactive] = React.useState(1)
  const [tax, settax] = React.useState(0)
  const [deliverydate, setdeliverydate] = React.useState(
    new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )

  const getcartitemsfromlocalstorage = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      console.log(cart)
      setcartdata(cart)

      let tempsubtotal = 0
      cart.forEach(item => {
        tempsubtotal += item.productdata.SalesPrice * item.quantity
      })
     
      setsubtotal(tempsubtotal)
      setshipping(80)
      settax(tempsubtotal * 0.18 + 80 * 0.10)
      setreloadnavbar(!reloadnavbar)
    }
    else {
      console.log("Cart is empty")
      setreloadnavbar(!reloadnavbar)
    }
  }

  React.useEffect(() => {
    getcartitemsfromlocalstorage()
  }, [])

  const checklogin = () => {
    return true
  }

  const [reloadnavbar, setreloadnavbar] = React.useState(false)
  const removeitemfromcart = (index) => {
    // alert(index)
    let temp = [...cartdata]
    temp.splice(index, 1)
    setcartdata(temp)
    localStorage.setItem('cart', JSON.stringify(temp))
    getcartitemsfromlocalstorage()
  }

  const savedaddress = [
    {
      AddressLine1: "Address Line 1",
      AddressLine2: "Address Line 2",
      AddressLine3: "Address Line 3",
      postalcode: "123456"
    },
    {
      AddressLine1: "Address Line 1",
      AddressLine2: "Address Line 2",
      AddressLine3: "Address Line 3",
      postalcode: "123456"
    }
  ]


  const [selectedorderid, setselectedorderid] = useState(0)
  const [ordersuccesscont, setordersuccesscont] = useRecoilState(orderSuccessfulProvider)
  return (
    <div>
      <Navbar reloadnavbar={reloadnavbar} />
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
                  cartdata.length > 0 && checklogin() && setactive(1)
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
                  cartdata.length > 0 && checklogin() && setactive(1)
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
                  cartdata.length > 0 && checklogin() && setactive(2)
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
                  cartdata.length > 0 && checklogin() && setactive(2)
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
                  cartdata.length > 0 && checklogin() && setactive(3)
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
                  cartdata.length > 0 && checklogin() && setactive(3)
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
                  cartdata.length > 0 && checklogin() && setactive(4)
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
                  cartdata.length > 0 && checklogin() && setactive(4)
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
                                  window.location.href = `/product/${item.productdata.ProductId}`
                                }}
                              >
                                <img src={item.productdata.ProductImage[0].image}
                                  alt={item.productdata.ProductName} />
                                <p>{
                                  item.productdata.ProductName
                                }</p>
                              </div>
                            </td>

                            <td
                              data-label="Quantity"
                            >
                              <div className='quantity'>
                                <button className='minus' style={{color:'black'}}
                                  onClick={() => {
                                    let newcartdata = [...cartdata]

                                    if (newcartdata[index].quantity > 1) {
                                      newcartdata[index].quantity -= 1
                                      setcartdata(newcartdata)
                                      localStorage.setItem('cart', JSON.stringify(newcartdata))
                                      getcartitemsfromlocalstorage()
                                    }
                                  }}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button className='plus' style={{color:'black'}}
                                  onClick={() => {
                                    let newcartdata = [...cartdata]
                                    newcartdata[index].quantity += 1
                                    setcartdata(newcartdata)
                                    localStorage.setItem('cart', JSON.stringify(newcartdata))
                                    getcartitemsfromlocalstorage()
                                  }}
                                >+</button>
                              </div>
                            </td>

                            <td
                              data-label="Price"
                            >
                              <p>
                                $ {item.productdata.SalesPrice ? item.productdata.SalesPrice.toFixed(2) : 0.00}
                              </p>
                            </td>

                            <td>
                              <p>$ {
                                (item.productdata.SalesPrice * item.quantity).toFixed(2)
                              }</p>
                            </td>

                            <td
                              data-label="Remove"
                            >
                              <div className='delbtn'
                                onClick={() => {
                                  removeitemfromcart(index)
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
                      <td className='totaltableleft'>Sub-Total</td>
                      <td className='totaltableright'>
                        $ {subtotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Shipping</td>
                      <td className='totaltableright'>
                        $ {shipping.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Total</td>
                      <td className='totaltableright'>
                        $ {(subtotal + shipping).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Tax</td>
                      <td className='totaltableright'>
                        $ {tax.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='totaltableleft'>Net-Total</td>
                      <td className='totaltableright'>
                        $ {(tax + subtotal + shipping).toFixed(2)}
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
          <div className='shippingcont'>
            <div className='selectdate'>
              <h2 className='mainhead1'>Select Delivery Date</h2>
              <input
                min={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                type='date'
                value={deliverydate}
                onChange={(e) => {
                  setdeliverydate(e.target.value)
                }}
              />
            </div>
            <div className='previous'>
              <h2 className='mainhead1'>Previous Saved Address</h2>
              {
                savedaddress.length > 0 ?
                  savedaddress.map((item, index) => {
                    return (
                      <div className='radio' key={index}>
                        <input type='radio' name='address' id={index} />
                        <span>
                          {
                            item.AddressLine1 + ', ' + item.AddressLine2 + ', ' + item.AddressLine3 + ', ' + item.postalcode
                          }
                        </span>
                      </div>
                    )
                  })
                  :
                  <div className='emptyaddress'>
                    <p>No address Found</p>
                  </div>
              }
            </div>
            <h3>OR</h3>
            <div className='shippingadd'>
              <input type='text' placeholder='Full Name' />
              <input type='text' placeholder='Address' />
              <input type='text' placeholder='Province' />
              <input type='text' placeholder='City' />
              <input type='text' placeholder='Postal Code' />
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
                <input type='radio' name='payment' id='payment1' />
                <img src='data:image/jpeg;base64,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'
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
              <span>$ {(subtotal + tax + shipping).toFixed(2)}</span>
            </div>
          </div>
        }
        {
          active == 4 &&
          <div className='ordersuccessfull'>
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
                checklogin() && setactive(4)
              }}
            >Next</button>
          </div>
        }
        {
          active == 4 &&
          <div className='btns'>
            
            <button className='nextbtn' style={{backgroundColor:'blue'}}
              onClick={() => {
                setselectedorderid(12345)
                setordersuccesscont(true)
              }}
            >View Invoice</button>
          </div>
        }
      </div>
      <Footer1 />
      <Footer2 />
    </div>
  )
}

export default Cart