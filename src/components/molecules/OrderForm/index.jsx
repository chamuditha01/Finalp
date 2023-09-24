import React, { useState } from 'react';
import './Order.css'


function PopupForm() {
  const [showPopup, setShowPopup] = useState(false);


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  

 

  return (
    <div>
      <button  onClick={togglePopup} className="buy" >
              Buy Now
            </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Payment</h2>
            <form
          style={{
            width:'400px'
          }}
          className="row g-3"
          
        >
                
          <div className="col-12">
            <label style={{ color: '#000080' }} htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="Email"
              placeholder="zehan@gmail.com"
              
            />
          </div>
          <div className="col-6">
            <label style={{ color: '#000080' }} htmlFor="Card" className="form-label">
              Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="Card"
              placeholder="16 digit"
              
            />
          </div>
          <div className="col-3">
            <label style={{ color: '#000080',marginLeft:'80px' }} htmlFor="Exp" className="form-label">
              Exp
            </label>
            <input className="form-control" type="number" id="year" name="year" min="23" max="99" step="1" placeholder="YY" required></input>
          </div>
          <div className="col-3">
            <input style={{marginTop: '32px'}} className="form-control" type="number" id="month" name="month" min="1" max="12" step="1" placeholder="MM" required></input>
          </div>

          <div className="col-12">
            <label style={{ color: '#000080' }} htmlFor="ShippingAdrress" className="form-label">
              Shipping Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="No. 508 wackwella Road"
              
            />
          </div>

          
          <div className="col-6">
            <label style={{ color: '#000080' }} htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Galle"
              
            />
          </div>

          <div className="col-3">
            <label style={{ color: '#000080' }} htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              id="quantity"
              placeholder='0'
             
             
            />
            
          </div>

          <div className="col-3">
            <label style={{ color: '#000080' }} htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="80170"
              
            />
          </div>

          <center>
            <div className="col-12">
            <button id="b2">Confirm</button>
              <button id="b2"onClick={togglePopup}>Close</button>
            </div>
          </center>
        </form>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupForm;
