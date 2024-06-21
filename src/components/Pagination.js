import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination bg-red-500 p-4 flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-full bg-black text-white rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 rounded-full py-2 bg-black text-white rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
