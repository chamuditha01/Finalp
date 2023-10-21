import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient("https://lofcmwxslorwbhglestg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZmNtd3hzbG9yd2JoZ2xlc3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDE4NjUsImV4cCI6MjAxMzQ3Nzg2NX0.tXKVMSHGCOZK7fUsJJavUF6ufAaPB7TSntt1FIPzzfY");

const EmployeesPopup = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from('employees').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setEmployees(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async () => {
    if (
      newEmployee.name &&
      newEmployee.department &&
      newEmployee.phone &&
      newEmployee.email &&
      newEmployee.password
    ) {
      const { data, error } = await supabase.from('employees').upsert([newEmployee]);
      if (error) {
        console.error('Error adding Employee:', error);
      } else {
        fetchEmployees(); // Refresh the list of Employees
      }

      setNewEmployee({
        name: '',
        department: '',
        phone: '',
        email: '',
        password: '',
      });

      setIsAdding(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee(employee);
    setIsAdding(true);
  };

  const handleDeleteEmployee = async (id) => {
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) {
      console.error('Error deleting Employee:', error);
    } else {
      fetchEmployees(); // Refresh the list of Employees
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
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Department"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Phone"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Email"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="password"
                      value={newEmployee.password}
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
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>{employee.password}</td>
                  <td>
                    <button
                      className="btn btn-primary edit"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger delete"
                      onClick={() => handleDeleteEmployee(employee.id)}
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

export default EmployeesPopup;
