import React, { useState } from 'react';
import Payment from 'react-payment';

function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <Payment
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry">Expiry</label>
          <Payment
            type="text"
            name="expiry"
            id="expiry"
            value={paymentData.expiry}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <Payment
            type="text"
            name="cvc"
            id="cvc"
            value={paymentData.cvc}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentForm;
