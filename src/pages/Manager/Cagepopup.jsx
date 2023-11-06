import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';

function CagePopup() {
  const [cageBookings, setCageBookings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);



  useEffect(() => {
    fetchCageBookings();
  }, []);

  

  async function handleAddNewCage() {
    try {
  
      const { data: existingCageData, error: existingCageError } = await supabase
        .from('Cages')
        .select('Cages_id');
  
      if (existingCageError) {
        alert('Error fetching existing cage IDs:', existingCageError);
        return;
      }
  

      const largestCageId = existingCageData.reduce(
        (max, cage) => (cage.Cages_id > max ? cage.Cages_id : max),
        0
      );
  

      const newCageId = largestCageId + 1;
  
      
      const { data, error } = await supabase
        .from('Cages')
        .upsert([
          {
            Cages_id: newCageId,
            Cages_Status: 'accept'
          }
        ]);
  
      if (error) {
        alert('Error adding a new cage:', error);
      } else {
        fetchCageBookings();
      }
    } catch (error) {
      alert('Error adding a new cage:', error);
    }
  }
  


  const fetchCageBookings = async () => {
    try {
      const { data, error } = await supabase.from('Cages').select();
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
          b.Cages_id === booking.Cages_id ? { ...b, Cages_Status: action } : b
        )
      );

      const { error } = await supabase
        .from('Cages')
        .upsert([
          {
            Cages_id: booking.Cages_id,
            Cages_Status: action,
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
                <th>Cage Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            
                <tr>
                  <td colSpan="6">
                    <button
                      type="button"
                      className="btn btn-info add-new"
                      onClick={handleAddNewCage}
                    >
                      Add New
                    </button>
                  </td>
                </tr>
              
              
               
                  
                 
                  
              
              {cageBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.Cages_id}</td>
                  <td>{booking.Cages_Status}</td>
                  
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`acceptRadio-${index}`}
                        checked={booking.Cages_Status === 'accept'}
                        onChange={() => handleAction('accept', booking)}
                      />
                      <label className="btn btn-outline-success" htmlFor={`acceptRadio-${index}`}>
                        Accept
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name={`actionRadio-${index}`}
                        id={`rejectRadio-${index}`}
                        checked={booking.Cages_Status === 'reject'}
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
