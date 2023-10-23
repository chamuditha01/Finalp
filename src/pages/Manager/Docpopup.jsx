import React, { useState, useEffect } from 'react';
import supabase from '../../lib/helper/superbaseClient';

const EmployeesPopup = () => {
  const [Doctors, setDoctors] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    Doctor_Name: '',
    Department: '',
    Contact: '',
    Email: '',
    Passward: '',
    manager_id: '1' // Set a default manager_id if needed
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('Doctor').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setDoctors(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee(employee);
    setEditingEmployeeId(employee.id);
    setIsAdding(true);
  };

  const handleAddEmployee = async () => {
    if (
      newEmployee.Doctor_Name &&
      newEmployee.Department &&
      newEmployee.Contact &&
      newEmployee.Email &&
      newEmployee.Passward
    ) {
      if (editingEmployeeId) {
        // If you're editing, update the existing employee
        const { data, error } = await supabase
          .from('Doctor')
          .upsert([{ ...newEmployee, id: editingEmployeeId }]);
        if (error) {
          alert('Error updating Employee:', error);
        }
      } else {
        
        const managerId = '1'; 
        const employeeToAdd = {
          ...newEmployee,
          manager_id: managerId
        };
        const { data, error } = await supabase.from('Doctor').upsert([employeeToAdd]);
        if (error) {
          alert('Error adding Employee:', error);
        }
      }

      setNewEmployee({
        Doctor_Name: '',
        Department: '',
        Contact: '',
        Email: '',
        Passward: '',
        manager_id: '1' 
      });

      setIsAdding(false);
      setEditingEmployeeId(null);
      fetchEmployees();
    }
  };

  const handleDeleteEmployee = async (id) => {
    const { error } = await supabase.from('Doctor').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Employee:', error);
    } else {
      fetchEmployees(); 
    }
  };

  return (
    <div>
      <h1 className="h1">Employees</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
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
                      name="Doctor_Name"
                      value={newEmployee.Doctor_Name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Department"
                      value={newEmployee.Department}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Department"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Contact"
                      value={newEmployee.Contact}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Phone"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Email"
                      value={newEmployee.Email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Email"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Passward"
                      value={newEmployee.Passward}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Password"
                    />
                  </td>
                  <td>
                    <button className="btn btn-success edit" onClick={handleAddEmployee}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
              {Doctors.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.Doctor_Name}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.Contact}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.Passward}</td>
                  <td>
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
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

export default EmployeesPopup;
