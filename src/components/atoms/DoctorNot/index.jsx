import React, { useState } from "react";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

function DoctorNot({no,head,cont,time}) {
  const [showPopup, setShowPopup] = useState(false);
  

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

 

  return (
    <div>
      <button
      id="bb1"
       
        onClick={togglePopup}
        className="buy"
      >
        {no}
      </button>
      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h1 style={{ textAlign: "center" }}>Appointment Details</h1>

            <h2>{head}</h2>
            <p>{cont}</p>
            <p>{time}</p>
                  <button id="b2" onClick={togglePopup}>
                    Close
                  </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorNot;
