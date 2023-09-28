// Form1.js
import React from 'react';
import { useForm } from 'react-hook-form';

const Form2 = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="row">
      <div className="col-md-4">
            <label style={{ color: '#000080' }} htmlFor="inputState" className="form-label">
              Type
            </label>
            <select
              id="inputtype"
              className="form-select"
              
            >
              <option selected>Choose...</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>other</option>
              
            </select>
          </div>
        <div class="col">
            <input type="number" class="form-control" placeholder="Breed" aria-label="Breed"></input>
        </div>
        </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form2;
