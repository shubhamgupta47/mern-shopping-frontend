import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fire
    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName('');
      }
    });
  };

  const goback = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
    </div>
  );

  const successMessage = () => {
    if(success) {
      return <h5 className="text-success">Category created successfully</h5>
    }
  }
  const warningMessage = () => {
    if(error) {
      return <h5 className="text-danger">Failed to create category</h5>
    }
  }

  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For e.g. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for T-shirt"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goback()}
          </div>
      </div>
    </Base>
  );
};

export default AddCategory;
