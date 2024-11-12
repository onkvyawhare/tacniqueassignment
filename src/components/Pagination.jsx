import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="mx-2 text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;