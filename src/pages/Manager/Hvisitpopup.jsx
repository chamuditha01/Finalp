import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './dt.css';
import supabase from '../../lib/helper/superbaseClient';

function AppointmentPopup() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentStatuses, setAppointmentStatuses] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
  
    const today = currentDate.toISOString().split("T")[0];
    const nextSevenDays = nextWeek.toISOString().split("T")[0];
  
    async function fetchAppointments() {
      try {
        const { data, error } = await supabase
          .from('Appointment')
          .select()
          .eq('appointment_type', 'Home Visit')
          .gte('date', today)
          .lte('date', nextSevenDays);
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          const appointmentsWithAddressAndDoctorName = await Promise.all(
            data.map(async (appointment) => {
              const { data: homeVisitData, error: homeVisitError } = await supabase
                .from('Home_Visit')
                .select('location')
                .eq('Home_Visit_id', appointment.Appointment_id);
              if (homeVisitError) {
                console.error('Error fetching address:', homeVisitError);
              }
  
              const { data: doctorData, error: doctorError } = await supabase
                .from('Doctor')
                .select('Doctor_Name')
                .eq('id', appointment.Doctor_id);
              if (doctorError) {
                console.error('Error fetching doctor name:', doctorError);
              }

              const { data: petData, error: petError } = await supabase
                .from('Pet_Profile')
                .select('Pet_Name')
                .eq('Pet_Profile_id', appointment.Pet_Id);
              if (petError) {
                console.error('Error fetching doctor name:', petError);
              }
  
              return {
                ...appointment,
                address: homeVisitData?.[0]?.location || 'Address not available',
                doctor_name: doctorData?.[0]?.Doctor_Name || 'Doctor name not available',
                pet_name: petData?.[0]?.Pet_Name || 'Doctor name not available',
              };
            })
          );
  
          setAppointments(appointmentsWithAddressAndDoctorName);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchAppointments();
  }, []);
  

  


  
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
                <th>Doctor</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.pet_name}</td>
                  <td>Dr. {appointment.doctor_name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.payment}</td>
                  <td>{appointment.address}</td>
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
