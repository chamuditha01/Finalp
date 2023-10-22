import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient("https://lofcmwxslorwbhglestg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZmNtd3hzbG9yd2JoZ2xlc3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDE4NjUsImV4cCI6MjAxMzQ3Nzg2NX0.tXKVMSHGCOZK7fUsJJavUF6ufAaPB7TSntt1FIPzzfY");

const PetOwnerPopup = () => {
  const [petOwners, setPetOwners] = useState([]);
  const [newPetOwner, setNewPetOwner] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPetOwners();
  }, []);

  const fetchPetOwners = async () => {
    const { data, error } = await supabase.from('petowners').select();
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

  const handleAddPetOwner = async () => {
    if (
      newPetOwner.name &&
      newPetOwner.address &&
      newPetOwner.phone &&
      newPetOwner.email &&
      newPetOwner.password
    ) {
      const { data, error } = await supabase.from('petowners').upsert([newPetOwner]);
      if (error) {
        console.error('Error adding Pet Owner:', error);
      } else {
        fetchPetOwners(); // Refresh the list of Pet Owners
      }

      setNewPetOwner({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
      });

      setIsAdding(false);
    }
  };

  const handleEditPetOwner = (petOwner) => {
    setNewPetOwner(petOwner);
    setIsAdding(true);
  };

  const handleDeletePetOwner = async (id) => {
    const { error } = await supabase.from('petowners').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Pet Owner:', error);
    } else {
      fetchPetOwners(); // Refresh the list of Pet Owners
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
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={newPetOwner.address}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Address"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={newPetOwner.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Phone"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={newPetOwner.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Email"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="password"
                      value={newPetOwner.password}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Password"
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
                <tr key={petOwner.id}>
                  <td>{petOwner.name}</td>
                  <td>{petOwner.address}</td>
                  <td>{petOwner.phone}</td>
                  <td>{petOwner.email}</td>
                  <td>{petOwner.password}</td>
                  <td>
                    <button
                      className="btn btn-primary edit"
                      onClick={() => handleEditPetOwner(petOwner)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger delete"
                      onClick={() => handleDeletePetOwner(petOwner.id)}
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

export default PetOwnerPopup;
