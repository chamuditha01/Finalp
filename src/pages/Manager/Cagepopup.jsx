import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lofcmwxslorwbhglestg.supabase.co';
const supabaseKey = 'YOUR_API_KEY';

const supabase = createClient("https://lofcmwxslorwbhglestg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZmNtd3hzbG9yd2JoZ2xlc3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDE4NjUsImV4cCI6MjAxMzQ3Nzg2NX0.tXKVMSHGCOZK7fUsJJavUF6ufAaPB7TSntt1FIPzzfY");

function CagePopup() {
  const [cageBookings, setCageBookings] = useState([]);

  useEffect(() => {
    fetchCageBookings();
  }, []);

  const fetchCageBookings = async () => {
    try {
      const { data, error } = await supabase.from('cage_bookings').select();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCageBookings(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function handleAction(action, booking) {
    try {
      setCageBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === booking.id ? { ...b, status: action } : b
        )
      );

      const { error } = await supabase
        .from('cage_bookings')
        .upsert([
          {
            id: booking.id,
            status: action,
          },
        ]);

      if (error) {
        console.error('Error updating booking status:', error);
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  }

  return (
    <div>
      <h1 className="h1">Cages Booking</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Pet Owner Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cageBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.patientname}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.payment}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`approveRadio-${index}`}
                        checked={booking.status === 'approve'}
                        onChange={() => handleAction('approve', booking)}
                      />
                      <label className="btn btn-outline-success" htmlFor={`approveRadio-${index}`}>
                        Approve
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`rejectRadio-${index}`}
                        checked={booking.status === 'reject'}
                        onChange={() => handleAction('reject', booking)}
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

export default CagePopup;
