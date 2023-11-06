import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import supabase from "../../../lib/helper/superbaseClient";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function AppointmentScheduler() {
  const [doctorNames, setDoctorNames] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [CustomerAddress, setCustomerAddress] = useState(null);
  const location = useLocation();
  const PetId = location.state && location.state.PetId;
  const userId = location.state && location.state.userId;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    async function fetchDoctorNames() {
      const { data, error } = await supabase
        .from("Doctor")
        .select("id,Doctor_Name");

      if (error) {
        alert("Error fetching doctor names:", error);
      } else {
        setDoctorNames(data);
      }
    }
fetchCustomerAddress();
    fetchDoctorNames();
  }, []);

  async function saveAppointment(appointmentData) {
    try {
      const appointmentDate = new Date(selectedDate);
      
      appointmentDate.setDate(appointmentDate.getDate() + 1);
     
      const { data, error } = await supabase.from("Appointment").upsert([
        {
          date: appointmentDate,
          Description: appointmentData.Description,
          appointment_type: appointmentData.appointment_type,
          Pet_Id: appointmentData.Pet_Id,
          Doctor_id: appointmentData.doctor,
        },
      ]);
  
      if (error) {
        console.error("Error saving appointment:", error);
      } else {
        console.error("Appointment saved successfully.");
  
        const { data: lastInsertedRecord, error: lastInsertedError } = await supabase
          .from("Appointment")
          .select("Appointment_id")
          .order("Appointment_id", { ascending: false })
          .limit(1);
  
        if (lastInsertedError) {
          console.error("Error fetching the last inserted ID:", lastInsertedError);
        } else {
          const insertedAppointmentId = lastInsertedRecord[0].Appointment_id;
          console.error("Last inserted ID:", insertedAppointmentId);
  
          if (appointmentData.appointment_type === "Clinic") {
            
            insertIntoClinicVisit(insertedAppointmentId);
          }
          else{
            insertIntoHomevisit(insertedAppointmentId);
            
          }
        }
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  }

  async function fetchCustomerAddress() {
    const { data, error } = await supabase
      .from("Customer")
      .select("address")
      .eq("Customer_id", userId)
      .single(); 

    if (error) {
      console("Error fetching customer address:", error);
    } else {
      setCustomerAddress(data.address);
      
    }
  }



  async function insertIntoClinicVisit(insertedAppointmentId) {
    try {
      const { data, error } = await supabase.from("Clinic_Visit").upsert([
        {
          Clinic_Visit_id: insertedAppointmentId
          
          
        },
      ]);
  
      if (error) {
        console.error("Error inserting into Clinic Visit:", error);
      } else {
        console.error("Inserted into Clinic Visit successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting into Clinic Visit:", error);
    }
  }

  async function insertIntoHomevisit(insertedAppointmentId) {
    try {
      const { data, error } = await supabase.from("Home_Visit").upsert([
        {
          Home_Visit_id: insertedAppointmentId, 
          location: CustomerAddress 
        },
      ]);
  
      if (error) {
        console.error("Error inserting into Clinic Visit:", error);
      } else {
        console.error("Inserted into Clinic Visit successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting into Clinic Visit:", error);
    }
  }

  const handleScheduleClick = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleString("en-US", {
        timeZone: "UTC", 
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      

      
      const appointmentData = {
        date: selectedDate,
        Description: document.getElementById("description").value,
        doctor: document.getElementById("SelectDoctor").value,
        appointment_type: document.getElementById("SelectType").value,
        Pet_Id:PetId
        
      };

      
      saveAppointment(appointmentData);

      window.alert(
        `You have scheduled the appointment for: ${formattedDate}. Appointment submitted successfully! .`
      );

      setSelectedDate(null);
      setShowConfirmation(true);
    } else {
      window.alert("Please select a date and time for the appointment.");
    }
  };
  const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

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
        minDate={tomorrow}
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
  onChange={(e) => setSelectedDoctorId(e.target.value)}
  value={selectedDoctorId}
>
  <option value="" >
    Choose...
  </option>
  {doctorNames.map((row) => (
    <option
      style={{ fontSize: "13px" }}
      key={row.id} 
      value={row.id}
    >
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