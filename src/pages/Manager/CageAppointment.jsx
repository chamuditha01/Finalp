import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';

function CageAppointment() {
  const [cageBookings, setCageBookings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchCageBookings() {
      try {
        const { data, error } = await supabase
          .from('Book_Cages')
          .select('Cages_Id, Booked_Date, Pet_Id')
          .gt('Booked_Date', today)
          .order('Cages_Id');
  
        if (error) {
          console.error('Error fetching cage bookings:', error);
        } else {
          setCageBookings(data);
        }
      } catch (error) {
        console.error('Error fetching cage bookings:', error);
      }
    }
  
    fetchCageBookings();
  }, []);

  return (
    <div>
      <h1 className="h1">Cages Bookings For Next Week</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Cage Number</th>
                <th>Date</th>
                <th>Pet Id</th>
              </tr>
            </thead>
            <tbody>
              {cageBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.Cages_Id}</td>
                  <td>{booking.Booked_Date}</td>
                  <td>{booking.Pet_Id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CageAppointment;
