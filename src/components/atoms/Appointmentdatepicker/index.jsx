import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleClick = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Display a popup message with the selected date and time
      window.alert(`You have scheduled the appointment for: ${formattedDate}. Appointment submitted successfully! You will receive a message shortly confirming the scheduled time.`);

      // Reset the selected date to null
      setSelectedDate(null);

      // Toggle the confirmation message visibility
      setShowConfirmation(true);
    } else {
      // If no date is selected, display an error message
      window.alert('Please select a date and time for the appointment.');
    }
  };

  return (
    <div className="shed">
      <h2 id="a1">Appointment Scheduler</h2>
      <label id="a">Select Appointment Date:</label><br></br>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd h:mm aa"
        timeCaption="Time"
      />
      <p id="a">Selected Date: {selectedDate ? selectedDate.toString() : 'No date selected'}</p>
      <div className="col-12">
        <button
          style={{ height: '50px', width: '100px', borderRadius: '20px', fontSize: '12px', marginBottom: '10px', fontStyle: 'italic' }}
          type="button"
          className="btn btn-primary"
          onClick={handleScheduleClick}
        >
          Schedule
        </button>
      </div>

      {showConfirmation && (
        <p id="b">Appointment submitted successfully! You will receive a message shortly confirming the scheduled time.</p>
      )}
    </div>
  );
}

export default AppointmentScheduler;
