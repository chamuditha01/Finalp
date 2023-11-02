import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';
import { useLocation } from 'react-router-dom';
import  { useRef } from 'react';
import emailjs from 'emailjs-com';


const PetOwnersPopup = () => {
  const location = useLocation();
  const Manager_id = location.state && location.state.Manager_id;
  const [petOwners, setPetOwners] = useState([]);
  const [newPetOwner, setNewPetOwner] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    Manager_id : '1',
    userId:''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPetOwners();
  }, []);

  const fetchPetOwners = async () => {
    const { data, error } = await supabase.from('Customer').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setPetOwners(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetOwner({ ...newPetOwner, [name]: value });
  };

  const handleLoginOwner = async () => {
    try {
      
      const { data: customerData, error: customerError } = await supabase
        .from('Customer')
        .select('Customer_id')
        .eq('email', newPetOwner.email);
  
      if (customerError) {
        alert('Error querying Customer data: ' + customerError.message);
        return;
      }
  
      if (customerData && customerData.length > 0) {
        const userId = customerData[0].Customer_id;
  
        
        const { data: upsertData, error: upsertError } = await supabase.from('Pet_Owner1').upsert([
          {
            id: userId,
            Manager_id: Manager_id
          }
        ]);
  
        if (upsertError) {
          console('Error inserting data into Pet_Owner1:', upsertError);
        } else {
          console('Data inserted successfully into Pet_Owner1:', upsertData);
        }
      } else {
        alert('User not found with the provided email.');
      }
    } catch (error) {
      alert('An error occurred:', error);
    }
  };
  
  

  const handleAddPetOwner = async () => {
    if (
      newPetOwner.name &&
      newPetOwner.address &&
      newPetOwner.phone &&
      newPetOwner.email &&
      newPetOwner.password
    ) {
      try {
        // Add the new pet owner to the database
        const { data, error } = await supabase.from('Customer').upsert([newPetOwner]);
        if (error) {
          alert('Error adding Pet Owner:', error);
        } else {
          
          
            const emailParams = {
              to_email: newPetOwner.email,
              subject: 'Welcome to Pet Owner Portal',
              message: `Welcome to our pet owner portal! Your password is: ${newPetOwner.password}`,
              email: `Welcome to our pet owner portal! Your email is: ${newPetOwner.email}`
            };
          
            emailjs.send('service_4cqizvz', 'template_2w4oxbd', emailParams, 'A0ZPR861WjTOAyAZq')
              .then((result) => {
                
              })
              .catch((error) => {
                
              });
          
          
  
            fetchPetOwners();
            handleLoginOwner(); 
        }
  
        setNewPetOwner({
          name: '',
          address: '',
          phone: '',
          email: '',
          password: '',
        });
  
        setIsAdding(false);
      } catch (error) {
        alert('An error occurred:', error);
      }
    }
  };
  

  const handleDeletePetOwner = async (Customer_id) => {
    try {
      const { error } = await supabase.from('Customer').delete().eq('Customer_id', Customer_id);
      if (error) {
        alert('Error deleting Pet Owner:', error);
      } else {
        fetchPetOwners(); // Refresh the list of Pet Owners
      }
    } catch (error) {
      alert('An error occurred:', error);
    }
  };
  
  
  return (
    
    <div>
      
      <h1 className="h1">Pet Owners</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isAdding && (
                <tr>
                  <td colSpan="6">
                    <button
                      type="button"
                      className="btn btn-info add-new"
                      onClick={() => setIsAdding(true)}
                    >
                      Add New
                    </button>
                  </td>
                </tr>
              )}
              {isAdding && (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={newPetOwner.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={newPetOwner.address}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={newPetOwner.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={newPetOwner.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="password"
                      value={newPetOwner.password}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button className="btn btn-success edit" onClick={handleAddPetOwner}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
              {petOwners.map((petOwner) => (
                <tr key={petOwner.Customer_id}>
                  <td>{petOwner.name}</td>
                  <td>{petOwner.address}</td>
                  <td>{petOwner.phone}</td>
                  <td>{petOwner.email}</td>
                  <td>{petOwner.password}</td>
                  <td>
                  <button
  className="btn btn-danger delete"
  onClick={() => handleDeletePetOwner(petOwner.Customer_id)}
>
  Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PetOwnersPopup;
