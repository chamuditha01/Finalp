import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './dt.css'
function AppointmentPopup() {
  const [showHomeVisit, setShowHomeVisit] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentStatuses, setAppointmentStatuses] = useState({});

  const homeVisitData = [
    { date: '2023-09-30', patientName: 'Kevin', time: '7.30 am', payment: '1000.00lkr' },
    { date: '2023-09-30', patientName: 'Kevin', time: '8.00 am', payment: '1200.00lkr' },
  ];

  const handleAction = (action, appointment) => {
    setAppointmentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [appointment.patientName]: action,
    }));
    setSelectedAppointment(appointment);
  };

  return (
    <div>
      <h1 className='h1'>PET CLINIC</h1>
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
              {homeVisitData.map((row, index) => (
                <tr key={index}>
                  <td>{row.patientName}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.payment}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`approveRadio-${index}`}
                        checked={appointmentStatuses[row.patientName] === 'approve'}
                        onChange={() => handleAction('approve', row)}
                      />
                      <label className="btn btn-outline-success" htmlFor={`approveRadio-${index}`}>
                        Approve
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`rejectRadio-${index}`}
                        checked={appointmentStatuses[row.patientName] === 'reject'}
                        onChange={() => handleAction('reject', row)}
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
