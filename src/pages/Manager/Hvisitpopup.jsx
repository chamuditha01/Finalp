import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './dt.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://lofcmwxslorwbhglestg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZmNtd3hzbG9yd2JoZ2xlc3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDE4NjUsImV4cCI6MjAxMzQ3Nzg2NX0.tXKVMSHGCOZK7fUsJJavUF6ufAaPB7TSntt1FIPzzfY");

function AppointmentPopup() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentStatuses, setAppointmentStatuses] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const { data, error } = await supabase.from('hvisitappointments').select();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleAction = async (action, appointment) => {
    setAppointmentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [appointment.patientName]: action,
    }));
    setSelectedAppointment(appointment);

    try {
      const { error } = await supabase
        .from('hvisitappointments')
        .upsert([
          {
            id: appointment.id,
            status: action,
          },
        ]);

      if (error) {
        console.error('Error updating appointment status:', error);
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  }

  return (
    <div>
      <h1 className='h1'>HOME VISIT</h1>
      <div className="center-table-content">
        <div className="table-responsive"> 
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patientname}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.payment}</td>
                  <td>
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input
                          type="radio"
                          className="btn-check"
                          name={`actionRadio-${index}`}
                          id={`approveRadio-${index}`}
                          checked={appointment.status === 'approve'}
                          onChange={() => handleAction('approve', appointment)}
                        />
                        <label className="btn btn-outline-success" htmlFor={`approveRadio-${index}`}>
                          Approve
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name={`actionRadio-${index}`}
                          id={`rejectRadio-${index}`}
                          checked={appointment.status === 'reject'}
                          onChange={() => handleAction('reject', appointment)}
                        />
                        <label className="btn btn-outline-danger" htmlFor={`rejectRadio-${index}`}>
                          Reject
                        </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentPopup;
