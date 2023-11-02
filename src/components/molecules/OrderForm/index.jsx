import React, { useState, useEffect } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import supabase from "../../../lib/helper/superbaseClient";
import { useLocation, useNavigate } from "react-router-dom";

function PopupForm() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [confirmedCages, setConfirmedCages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cageNumbers, setCageNumbers] = useState([]);
  const status = "accept";
  const location = useLocation();
  const PetId = location.state && location.state.PetId;
  const userId = location.state && location.state.userId;
  const [selectedCageNumber, setSelectedCageNumber] = useState(null);
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setSelectedDate(null);
            setSelectedCageNumber(null);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    if (PetId && selectedCageNumber && selectedDate) {
      const data = [
        {
          Pet_Id: PetId,
          Cages_Id: selectedCageNumber,
          Booked_Date: selectedDate.toISOString(),
        },
      ];

      supabase
        .from("Book_Cages")
        .insert(data)
        .then(({ data, error }) => {
          if (error) {
            console.error("Error inserting data:", error);
          } else {
            alert("Data has been successfully inserted.");
            togglePopup();
            setSelectedDate(null);
            setSelectedCageNumber(null);
          }
        });
    } else {
      alert("Please select a date and cage before confirming.");
    }
  };

  const fetchCageNumbers = async () => {
    const { data, error } = await supabase
      .from("Cages")
      .select("Cages_id")
      .eq("Cages_Status", status);
    if (error) {
      console.error("Error fetching cage numbers:", error);
    } else {
      const numbers = data.map((cage) => cage.Cages_id);
      setCageNumbers(numbers);
    }
  };

  

  useEffect(() => {
    fetchCageNumbers();
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleCageClick = (cageNumber) => {
    setSelectedCageNumber(cageNumber);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchCageNumbers();
    
  };

  return (
    <div>
      <button
        style={{
          color: "white",
          marginTop: "13px",
          fontSize: "18px",
          fontWeight: "bold",
          marginRight: "12px",
        }}
        onClick={togglePopup}
        className="buy"
      >
        Book Cage
      </button>
      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h1 style={{ textAlign: "center" }}>Book Cages</h1>
            <form
              style={{
                width: "290px",
              }}
              className="row g-3"
            >
              <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                Select a Date
              </h3>
              <DatePicker
                selected={selectedDate}
                onSelect={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={tomorrow}
              />
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "-5px",
                  marginTop: "10px",
                }}
              >
                Select a Cage
              </h3>
              <div className="container">
                {cageNumbers.map((cageNumber) => (
                  <div
                    key={cageNumber}
                    id={`${cageNumber}`}
                    className={`c1 ${
                      selectedCageNumber === cageNumber
                        ? "clicked-cage"
                        : ""
                    }`}
                    onClick={() => handleCageClick(cageNumber)}
                  >
                    {cageNumber}
                  </div>
                ))}
              </div>

              <center>
                <div className="col-12">
                  
                  <button id="b2" onClick={handleConfirm}>
                    confirm
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
