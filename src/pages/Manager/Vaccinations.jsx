import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';
import { useLocation } from 'react-router-dom';

const VaccinationsPopup = () => {
  const location = useLocation();

  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    vaccineName: '',
    description: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingVaccineId, setEditingVaccineId] = useState(null);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    const { data, error } = await supabase.from('Vaccines').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setVaccines(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleAddVaccine = async () => {
    if (!newVaccine.vaccineName || !newVaccine.description) {
      alert('Please fill in all the required fields.');
      return;
    }

    const { data, error } = await supabase.from('Vaccines').insert([
      {
        vaccineName: newVaccine.vaccineName,
        description: newVaccine.description,
      },
    ]);

    if (error) {
      console.error('Error adding vaccine:', error);
    } else {
      alert('Vaccine added successfully');
      setIsAdding(false);
      setNewVaccine({
        vaccineName: '',
        description: '',
      });
      fetchVaccines();
    }
  };

  const handleEditVaccine = (vaccine) => {
    setNewVaccine(vaccine);
    setEditingVaccineId(vaccine.id);
    setIsAdding(true);
  };

  const handleDeleteVaccine = async (id) => {
    const { error } = await supabase.from('Vaccines').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Vaccine:', error);
    } else {
      fetchVaccines();
    }
  };

  return (
    <div>
      <h1 className="h1">Vaccines</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isAdding && (
                <tr>
                  <td colSpan="3">
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
                      name="vaccineName"
                      value={newVaccine.vaccineName}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Vaccine Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={newVaccine.description}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <button className="btn btn-success edit" onClick={handleAddVaccine}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.vaccineName}</td>
                  <td>{vaccine.description}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <button className="btn btn-primary" onClick={() => handleEditVaccine(vaccine)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteVaccine(vaccine.id)}>
                        Delete
                      </button>
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
};

export default VaccinationsPopup;
