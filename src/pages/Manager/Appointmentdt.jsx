import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './dt.css';

function Docdt() {
  const [showHomeVisit, setShowHomeVisit] = useState(false); 
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(null);

  const homeVisitData = [

    { date: '2023-09-30', patientName: 'akila', time: '7.30 am', payment: '1000.00lkr' },
    { date: '2023-09-30', patientName: 'pasan', time: '7.30 am', payment: '1000.00lkr' },
    { date: '2023-09-30', patientName: 'randula', time: '7.30 am', payment: '1000.00lkr' },
    { date: '2023-09-30', patientName: 'chamuditha', time: '7.30 am', payment: '1000.00lkr' },
   

  ];

  const handleAction = (action, appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentStatus(action);
  };

  let tableContent;
  if (showHomeVisit) {
    tableContent = (
      <table>
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
                <button
                  className={`approve-button ${appointmentStatus === 'approve' ? 'active' : ''}`}
                  onClick={() => handleAction('approve', row)}
                >
                  Approve
                </button>
                <button
                  className={`reject-button ${appointmentStatus === 'reject' ? 'active' : ''}`}
                  onClick={() => handleAction('reject', row)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
    <div className="toggle-appointments-button-container">
      <button
        className={`toggle-appointments-button ${showHomeVisit ? 'active' : ''}`}
        onClick={() => setShowHomeVisit(!showHomeVisit)}
      >
        {showHomeVisit ? 'Close Appointments' : 'View Appointments'}
      </button>
    </div>
    <div className="center-table-content">
      {showHomeVisit && <div className='centerdt'>{tableContent}</div>}
    </div>
  </div>
  );
}

export default Docdt;
