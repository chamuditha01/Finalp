import React, { useState } from 'react';
import './dt.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'silva', department: 'opd', phone: '076 555-2222' },
    { id: 2, name: 'sathira', department: 'Customer Service', phone: '076 555-5735' },
    { id: 3, name: 'sadaruwan', department: 'opd', phone: '078 555-9931' },
    // Add more employee data here
  ]);

  const [newEmployee, setNewEmployee] = useState({ id: null, name: '', department: '', phone: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.phone) {
      if (newEmployee.id === null) {
        setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
      } else {
        const updatedEmployees = employees.map((employee) =>
          employee.id === newEmployee.id ? newEmployee : employee
        );
        setEmployees(updatedEmployees);
      }
      setNewEmployee({ id: null, name: '', department: '', phone: '' });
      setIsAdding(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee({ ...employee });
    setIsAdding(true);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <>
      <h1 className='h1'>Doctor</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialist</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAdding ? (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success edit"
                      onClick={handleAddEmployee}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">
                    <button
                      type="button"
                      className="btn btn-info add-new"
                      onClick={() => setIsAdding(true)}
                    >
                      <i className="fa fa-plus"></i> Add New
                    </button>
                  </td>
                </tr>
              )}
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.phone}</td>
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
    </>
  );
};

export default EmployeeTable;
