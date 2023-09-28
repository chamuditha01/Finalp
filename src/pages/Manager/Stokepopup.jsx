import React, { useState } from 'react';
import './dt.css'
const Stokepopup = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Powder', department: '100', phone: '499.00' },
    { id: 2, name: ' biscuits', department: '500', phone: '999.00' },
    { id: 3, name: 'Toys', department: '100', phone: '1000.00' },
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
        // Adding a new employee
        setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
      } else {
        // Editing an existing employee
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

  return (   <><h1 className='h1'>Stoke</h1>
    <div className="center-table-content">
     
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-8">
              <h2>Employee <b>Details</b></h2>
            </div>
            <div className="col-sm-4">
              {!isAdding ? (
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={() => setIsAdding(true)}
                >
                  <i className="fa fa-plus"></i> Add New
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success add-new"
                  onClick={handleAddEmployee}
                >
                  <i className="fa fa-check"></i> Save
                </button>
              )}
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Amount</th>
              <th>price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
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
    </div></>
  );
};

export default Stokepopup;
