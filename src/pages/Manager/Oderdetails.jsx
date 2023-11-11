import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';
import './dt.css';

const Oderdetails = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const { data, error } = await supabase.from('Order_Item').select('*').neq('status', 'n');;
      if (error) {
        console.error('Error fetching order items:', error);
      } else {
        const itemsWithAddresses = await Promise.all(
          data.map(async (item) => {
            const customerAddress = await fetchCustomerAddress(item.cusid);
            return {
              ...item,
              address: customerAddress,
            };
          })
        );
        setOrderItems(itemsWithAddresses);
      }
    } catch (error) {
      console.error('An error occurred while fetching order items:', error.message);
    }
  };

  const fetchCustomerAddress = async (cusid) => {
    try {
      const { data, error } = await supabase
        .from('Customer')
        .select('address')
        .eq('Customer_id', cusid);

      if (error) {
        console.error('Error fetching customer address:', error);
        return 'N/A';
      } else {
        return data.length > 0 ? data[0].address : 'N/A';
      }
    } catch (error) {
      console.error('An error occurred while fetching customer address:', error.message);
      return 'N/A';
    }
  };

  return (
    <>
      <h1 className="h1">Order Details</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Product Id</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Customer Id</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.status}</td>
                  <td>{item.pet_product_id}</td>
                  <td>{item.Order_Item_quantity}</td>
                  <td>{item.address}</td>
                  <td>{item.cusid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Oderdetails;
