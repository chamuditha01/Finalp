import React, { useState } from 'react';

function Addnewpopup({ addNewEmployee }) {
  const [newEmployee, setNewEmployee] = useState({ name: '', department: '', phone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.phone) {
      addNewEmployee(newEmployee); // Call the callback function to add the new employee
      setNewEmployee({ name: '', department: '', phone: '' });
    }
  };

  return (
    <div>
      <h1>Add New Employee</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newEmployee.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={newEmployee.department}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={newEmployee.phone}
        onChange={handleInputChange}
      />
      <button onClick={handleAddEmployee}>Add</button>
    </div>
  );
}

export default Addnewpopup;
