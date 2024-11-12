import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../utils/usersSlice";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const USERS_PER_PAGE = 5;

function Home() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (status === "loading") {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          User Management Dashboard
        </h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add User
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Department</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
  {currentUsers.map((user) => (
    <tr key={user.id} className="border-b border-gray-200">
      <td className="py-2 px-4">{user.id}</td>
      <td className="py-2 px-4">
        {/* Safely accessing firstName or splitting name */}
        {user.firstName || (user.name ? user.name.split(" ")[0] : "N/A")}
      </td>
      <td className="py-2 px-4">
        {/* Safely accessing lastName or splitting name */}
        {user.lastName ||
          (user.name && user.name.split(" ").length > 1
            ? user.name.split(" ")[1]
            : "N/A")}
      </td>
      <td className="py-2 px-4">{user.email || "N/A"}</td>
      <td className="py-2 px-4">
        {/* Safely accessing company name */}
        {user.company && user.company.name ? user.company.name : "N/A"}
      </td>
      <td className="py-2 px-4 flex justify-center gap-3">
        {/* Edit Button - Blue and Rounded */}
        <Link
          to={`/edit/${user.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
        >
          Edit
        </Link>
        {/* Delete Button - Red and Rounded */}
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
