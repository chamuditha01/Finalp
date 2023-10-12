import React, { useState } from 'react'
import './OrderSuccessful.css'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'

const OrderSuccessful = ({ orderid, message, redirecto }) => {

    const [ setordersuccesscont] = useRecoilState(orderSuccessfulProvider)
    const [orderdata] = useState({
        OrderNo: orderid,
        OrderDate: '12/12/2021',
        OrderStatus: 'Delivered',
        CustomerName: 'Harshal Jain',
        CustomerShipToAddress: 'B-101, Shreeji Apartment, Near Shreeji Hospital, Kalyan West, Thane, Maharashtra 421301',
        CustomerEmail: 'virajj014@gmail.com',
        OrderItems: [
            {
                ProductName: 'Product 1',
                Price: 100,
                Quantity: 2,
            },
            {
                ProductName: 'Product 2',
                Price: 5000,
                Quantity: 5,
            }
        ],
        SubTotal: 25200,
        Tax: 100,
        ShippingCharges: 80,
        Total: 25380,
        PaymentType: 'Cash on Delivery'
    })
    return (
        <div
            className='OrdersSuccessful'
        >
            <button className='popup__close-btn'
                onClick={() => {

                    if(redirecto == 'userorders'){
                        window.location.href = '/user/yourorders'
                    }
                    setordersuccesscont(false)
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className='confirmationcont'>
                <div className='c' style={{width:'300px'}}>
                    
                    <h2>{message}</h2>
                </div>

                <div className='c2'>
                    <h2>Order Summary</h2>
                    <div>
                        <p>Order Number</p>
                        <p>{orderdata?.OrderNo}</p>
                    </div>
                    <div>
                        <p>Order Date</p>
                        <p>{
                            orderdata.OrderDate
                        }</p>
                    </div>

                    <div>
                        <p>Name</p>
                        <p>{
                            orderdata.CustomerName
                        }</p>
                    </div>

                    <div>
                        <p>Email</p>
                        <p>
                            {
                                orderdata.CustomerEmail
                            }
                        </p>
                    </div>

                    <div>
                        <p>Order Subtotal</p>
                        <p>$ {orderdata.SubTotal}</p>
                    </div>

                    <div>
                        <p>Payment Method</p>
                        <p>{orderdata.PaymentType}</p>
                    </div>

                    <div>
                        <p>Shipping Address</p>
                        <p>{orderdata.CustomerShipToAddress
                        }</p>
                    </div>

                    <div>
                        <p>Shipping Charges</p>
                        <p>$ {orderdata.ShippingCharges}</p>
                    </div>

                    <div>
                        <p>Tax</p>
                        <p>$ {orderdata.Tax}</p>
                    </div>

                    <div>
                        <p>Total</p>
                        <p>$ {orderdata.Total}</p>
                    </div>

                </div>

                <div className='c3'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orderdata?.OrderItems && orderdata.OrderItems.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <p>{index + 1}</p>
                                            </td>
                                            <td><p>{item.ProductName}</p></td>
                                            <td><p>${item.Price}</p></td>
                                            <td><p>{item.Quantity}</p></td>
                                            <td><p>${item.Price * item.Quantity}</p></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='totalcont'>
                    <div>
                        <p>Subtotal</p>
                        <p>$ {orderdata.SubTotal}</p>
                    </div>

                    <div>
                        <p>Shipping</p>
                        <p>$ {orderdata.ShippingCharges}</p>
                    </div>

                    <div>
                        <p>Tax</p>
                        <p>$ {orderdata.Tax}</p>
                    </div>

                    <div>
                        <p>Total</p>
                        <p>$ {orderdata.Total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccessful