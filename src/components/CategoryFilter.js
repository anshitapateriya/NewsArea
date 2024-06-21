import React, { useState } from 'react';

const categories = ['Business', 'Technology', 'Entertainment', 'Sports'];

const CategoryFilter = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="category-filter flex justify-center w-full  mt-24 mb-4">
      <div className="md:hidden mb-4">
        <select
          className="w-full px-4 py-2 bg-red-500 text-white rounded"
          value={selectedCategory}
          onChange={(e) => handleCategoryClick(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden md:flex w-fit justify-center space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 rounded-full py-2 text-white rounded hover:bg-red-700 ${selectedCategory === category ? 'bg-red-700' : 'bg-red-500'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
