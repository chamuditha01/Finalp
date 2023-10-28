import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import supabase from "../../../lib/helper/superbaseClient";

function AppointmentScheduler() {
  const [doctorNames, setDoctorNames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    async function fetchDoctorNames() {
      const { data, error } = await supabase
        .from("Doctor")
        .select("Doctor_Name");

      if (error) {
        console.error("Error fetching doctor names:", error);
      } else {
        setDoctorNames(data);
      }
    }

    fetchDoctorNames();
  }, []);

  async function saveAppointment(appointmentData) {
    try {
      const { data, error } = await supabase.from("Appointment").upsert([
        appointmentData.data,
        appointmentData.Description,
        appointmentData.appointment_type
      ]);

      if (error) {
        console.error("Error saving appointment:", error);
      } else {
        console.log("Appointment saved successfully:", data);
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  }

  const handleScheduleClick = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Collect appointment data
      const appointmentData = {
        date: selectedDate,
        Description: document.getElementById("description").value,
        doctor: document.getElementById("SelectDoctor").value,
        appointment_type: document.getElementById("SelectType").value,
      };

      // Save the appointment data to Supabase
      saveAppointment(appointmentData);

      window.alert(
        `You have scheduled the appointment for: ${formattedDate}. Appointment submitted successfully! You will receive a message shortly confirming the scheduled time.`
      );

      setSelectedDate(null);
      setShowConfirmation(true);
    } else {
      window.alert("Please select a date and time for the appointment.");
    }
  };

  return (
    <div className="shed">
      <h2 id="a1">Appointment Scheduler</h2>

      <label id="a">Select Appointment Date:</label>
      <br></br>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd h:mm aa"
        timeCaption="Time"
      />
      <p id="a">
        Selected Date:{" "}
        {selectedDate ? selectedDate.toString() : "No date selected"}
      </p>
      <label id="a" htmlFor="description">
        Description:
      </label>
      <textarea
        style={{
          width: "200px",
          height: "30px",
          marginLeft: "50px",
          marginBottom: "10px",
        }}
        id="description"
        className="form-control"
        name="description"
        rows="4"
        cols="50"
      ></textarea>

      <div className="col-12">
        <label id="a" htmlFor="SelectDoctor" className="form-label">
          Select Doctor
        </label>
        <select
          style={{
            width: "200px",
            height: "30px",
            marginLeft: "50px",
            borderRadius: "20px",
            marginBottom: "10px",
            fontSize: "13px",
          }}
          id="SelectDoctor"
          className="form-select"
        >
          <option selected>Choose...</option>
          {doctorNames.map((row) => (
            <option style={{ fontSize: "13px" }} key={row.Doctor_Name}>
              Dr. {row.Doctor_Name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <label id="a" htmlFor="SelectType" className="form-label">
          Select Type
        </label>
        <select
          style={{
            width: "200px",
            height: "30px",
            marginLeft: "50px",
            borderRadius: "20px",
            marginBottom: "10px",
            fontSize: "13px",
          }}
          id="SelectType"
          className="form-select"
        >
          <option selected>Choose...</option>
          <option style={{ fontSize: "13px" }}>Clinic</option>
          <option style={{ fontSize: "13px" }}>Home Visit</option>
        </select>
      </div>
      <div className="col-12">
        <button
          style={{
            height: "50px",
            width: "100px",
            borderRadius: "20px",
            fontSize: "12px",
            marginBottom: "10px",
            fontStyle: "italic",
          }}
          type="button"
          className="btn btn-primary"
          onClick={handleScheduleClick}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}

export default AppointmentScheduler;
