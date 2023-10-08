import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import './dt.css';

const Stokepopup = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Powder', department: '100', phone: '499.00', image: './images/petfood2.jpg' },
    { id: 2, name: 'Biscuits', department: '500', phone: '999.00', image: './images/petfood1.jpg' },
    { id: 3, name: 'Toys', department: '100', phone: '1000.00', image: './images/petfood.jpg' },
  ]);

  const [newEmployee, setNewEmployee] = useState({ id: null, name: '', department: '', phone: '', image: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewEmployee({ ...newEmployee, image: imageUrl });
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewEmployee({ ...newEmployee, image: imageUrl });
    }
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.phone && newEmployee.image) {
      if (newEmployee.id === null) {
        setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
      } else {
        const updatedEmployees = employees.map((employee) =>
          employee.id === newEmployee.id ? newEmployee : employee
        );
        setEmployees(updatedEmployees);
      }
      setNewEmployee({ id: null, name: '', department: '', phone: '', image: '' });
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
      <h1 className="h1">Stoke</h1>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Amount</th>
                <th>Price</th>
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
                      <FaImage className="file-upload-icon" /> Add New
                    </button>
                  </td>
                </tr>
              )}
              {isAdding && (
                <tr>
                  <td>
                    <label htmlFor="file-upload" className="file-upload-label">
                      <FaImage className="file-upload-icon larger-icon" />
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="form-control"
                      />
                    </label>
                    <div
                      onDrop={(e) => handleImageDrop(e)}
                      onDragOver={(e) => e.preventDefault()}
                      className="drop-zone"
                    >
                   
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Product Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Amount"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Price"
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
                  <td>
                    <img src={employee.image} alt={employee.name} width="50" height="50" />
                  </td>
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

export default Stokepopup;
