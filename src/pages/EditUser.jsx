import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUsers } from "../utils/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { validateUserForm } from "../utils/validate";

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(id))
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    } else {
      const nameParts = user.name.split(" ");
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        email: user.email || "",
        department: user.department || "",
      });
    }
  }, [user, dispatch]);

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
    try {
      const updatedUser = {
        id: parseInt(id),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        department: formData.department,
      };
      await dispatch(
        editUser({ id: parseInt(id), user: updatedUser })
      ).unwrap();
      navigate("/");
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!user) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
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
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
          >
            Save Changes
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

export default EditUser;