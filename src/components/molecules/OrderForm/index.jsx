import React, { useState } from 'react';
import './index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PopupForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [confirmedCages, setConfirmedCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const isCageBooked = (cageNumber, date) => {
    return confirmedCages.some((item) => item.cage === cageNumber && item.date.toDateString() === date.toDateString());
  };

  const handleDivClick = (cageNumber) => {
    if (selectedDate && isCageBooked(cageNumber, selectedDate)) {
      return;
    }

    setSelectedCage(cageNumber);
  };

  const handleConfirmClick = () => {
    if (selectedCage !== null && selectedDate !== null && !isCageBooked(selectedCage, selectedDate)) {
      setConfirmedCages([...confirmedCages, { cage: selectedCage, date: selectedDate }]);
      setSelectedCage(null);
      setSelectedDate(null);
    }
  };

  const handleClearClick = () => {
    setConfirmedCages([]);
  };

  return (
    <div>
      <button
        style={{ color: 'white', marginTop: '13px', fontSize: '18px', fontWeight: 'bold', marginRight: '12px' }}
        onClick={togglePopup}
        className="buy"
      >
        Book Cage
      </button>
      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h1 style={{ textAlign: 'center' }}>Book Cages</h1>
            <form
              style={{
                width: '290px',
              }}
              className="row g-3"
            >
              <h3 style={{ textAlign: 'center', marginBottom: '-5px' ,marginTop:'10px'}}>Select a Cage</h3>
              <div className="container">
                {[1, 2, 3, 4, 5, 6].map((cageNumber) => (
                  <div
                    style={{ cursor: 'pointer' }}
                    key={cageNumber}
                    id={`cage${cageNumber}`}
                    className={`c1 ${
                      selectedDate && isCageBooked(cageNumber, selectedDate)
                        ? 'confirmed-cage'
                        : selectedCage === cageNumber
                        ? 'clicked-cage'
                        : ''
                    }`}
                    onClick={() => handleDivClick(cageNumber)}
                  >
                    {cageNumber}
                  </div>
                ))}
              </div>

              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Select a Date</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isClearable
              />

              <center>
                <div className="col-12">
                  {selectedDate && confirmedCages.length > 0 ? (
                    <div>
                      <p>Confirmed Cages:</p>
                      <ul>
                        {confirmedCages.map((item, index) => (
                          <li key={index}>
                            Cage {item.cage} on {item.date.toDateString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {selectedCage !== null && selectedDate !== null && !isCageBooked(selectedCage, selectedDate) ? (
                    <button id="b2" onClick={handleConfirmClick}>
                      Confirm
                    </button>
                  ) : null}
                  <button id="b2" onClick={handleClearClick}>
                    Clear
                  </button>
                  <button id="b2" onClick={togglePopup}>
                    Close
                  </button>
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
