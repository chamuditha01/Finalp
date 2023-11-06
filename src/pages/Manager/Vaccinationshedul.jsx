import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";

const Vaccinationsshedul = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [petIds, setPetIds] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [petData, setPetData] = useState([]);
  const [vaccineOptions, setVaccineOptions] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    Vaccination_id: '',
    petId: '',
    date: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingVaccineId, setEditingVaccineId] = useState(null);

  useEffect(() => {
    fetchVaccines();
    fetchPetData();
    fetchVaccineOptions();
    fetchPetIds();
  }, []);

  const fetchVaccines = async () => {
    const { data, error } = await supabase.from('Schedule_Vaccine').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setVaccines(data);
    }
  };

  const fetchPetIds = async () => {
    const { data, error } = await supabase.from('Pets').select('Pet_Id');
    if (error) {
      console.error('Error fetching pet IDs:', error);
    } else {
      setPetIds(data.map((pet) => pet.Pet_Id));
    }
  };

  const fetchPetData = async () => {
    const { data, error } = await supabase.from('Pet_Profile').select('Pet_Profile_id, Pet_Name');
    if (error) {
      console.error('Error fetching pet data:', error);
    } else {
      setPetData(data);
    }
  };

  const fetchVaccineOptions = async () => {
    const { data, error } = await supabase.from('Vaccines').select('Vaccination_id, vaccineName');
    if (error) {
      console.error('Error fetching vaccine options:', error);
    } else {
      setVaccineOptions(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleEditVaccine = (vaccine) => {
    setNewVaccine(vaccine);
    setEditingVaccineId(vaccine.id);
    setIsAdding(true);
  };

  const handleDeleteVaccine = async (id) => {
    const { error } = await supabase.from('Schedule_Vaccine').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Vaccine:', error);
    } else {
      fetchVaccines();
    }
  };

  const handleSaveVaccine = async () => {
    try {
      
      const { data, error } = await supabase.from('Schedule_Vaccine').upsert([
        {
          Vaccination_id: newVaccine.Vaccination_id,
          Pet_Id: newVaccine.petId,
          Reminder_Date: newVaccine.date,
        },
      ]);

      if (error) {
        alert('Error saving vaccine:', error);
      } else {
        
        fetchVaccines();
        setIsAdding(false); 
        
        setNewVaccine({
          
          vaccineName: '',
          petId: '',
          date: '',
        });
      }
    } catch (error) {
      console.error('Error saving vaccine:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div>
      <h1 className="h1">Vaccinations schedule</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Pet</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isAdding && (
                <tr>
                  <td colSpan="5">
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
                    <select style={{ marginTop: '5px' }}
                      name="vaccineName"
                      value={newVaccine.vaccineName}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select Vaccine Name
                      </option>
                      {vaccineOptions.map((vaccine) => (
                        <option key={vaccine.Vaccination_id} value={vaccine.vaccineName}>
                          {vaccine.vaccineName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select style={{ marginTop: '5px' }}
                      name="petId"
                      value={newVaccine.petId}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select Pet
                      </option>
                      {petData.map((pet) => (
                        <option key={pet.Pet_Profile_id} value={pet.Pet_Profile_id}>
                          {pet.Pet_Profile_id}--{pet.Pet_Name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div style={{ width: '150px', height: '4px' }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd "
                        minDate={tomorrow}
                      />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-success edit" onClick={handleSaveVaccine}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.Vaccine_id}</td>
                  <td>{vaccine.Pet_Id}</td>
                  <td>{vaccine.Reminder_Date}</td>
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

export default Vaccinationsshedul;
