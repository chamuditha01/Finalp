import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import supabase from '../../lib/helper/superbaseClient';

function AppointmentPopup() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const lastWeekDates = [];
    const nextWeek = new Date(currentDate); 
    nextWeek.setDate(currentDate.getDate() + 7);
  
    const today = currentDate.toISOString().split("T")[0];
    const nextSevenDays = nextWeek.toISOString().split("T")[0];

    async function fetchAppointments() {
    try {
      const { data, error } = await supabase.from('Appointment').select().eq('appointment_type', 'Clinic')
      .gte('date', today)
      .lte('date', nextSevenDays);;
      if (error) {
        console.error('Error fetching data:', error);
      } else {

        const appointmentsWithAddress = await Promise.all(
          data.map(async (appointment) => {
            const { data: homeVisitData, error: homeVisitError } = await supabase
              .from('Doctor')
              .select('Doctor_Name')
              .eq('id', appointment.Doctor_id);
            if (homeVisitError) {
              console.error('Error fetching address:', homeVisitError);
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
                
                doctor_name: homeVisitData?.[0]?.Doctor_Name || 'Doctor name not available',
                pet_name: petData?.[0]?.Pet_Name || 'Doctor name not available',
              };
          })
        );

        setAppointments(appointmentsWithAddress);
        
        
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
    fetchAppointments();
  }, []);

 

  

  async function handleAction(action, appointment) {
    try {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointment.id ? { ...appt, status: action } : appt
        )
      );

      const { error } = await supabase
        .from('appointments')
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
      <h1 className="h1">PET CLINIC</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : (
                appointments.map((appointment, index) => (
                  <tr key={index}>
                    
                    <td>{appointment.pet_name}</td>
                    <td>Dr. {appointment.doctor_name}</td>
                    <td>{appointment.date}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentPopup;
