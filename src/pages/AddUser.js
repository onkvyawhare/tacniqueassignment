import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/usersSlice";
import { useNavigate } from "react-router-dom";
import { validateUserForm } from "../utils/validate";

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Ensure the department is set to "N/A" only if it's empty or missing
    const userToAdd = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      department: formData.department.trim() || "N/A", // Only set to "N/A" if empty
    };

    // Debugging: Log the data to check before dispatching
    console.log("User data to add:", userToAdd);

    try {
      await dispatch(addUser(userToAdd)).unwrap(); // Dispatch the action to add the user
      navigate("/"); // Navigate back to home
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home page without adding the user
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Add User</h2>
      {errors.submit && (
        <div className="text-red-500 text-center mb-4">{errors.submit}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border p-3 rounded-md ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border p-3 rounded-md ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-3 rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full border p-3 rounded-md ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 mx-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;

