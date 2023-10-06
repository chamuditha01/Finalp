import React from "react";
import { useForm } from "react-hook-form";

const Form1 = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Pet name"
            aria-label="Pet Name"
          ></input>
        </div>
        <div class="col">
          <input
            type="number"
            class="form-control"
            placeholder="0"
            aria-label="Age"
          ></input>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form1;
