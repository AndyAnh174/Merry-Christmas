import React from 'react';

const CardCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`
            px-6 py-3 rounded-full font-christmas text-xl transition-all
            ${selectedCategory === category.id
              ? 'bg-christmas-red text-white shadow-lg scale-105'
              : 'bg-white text-christmas-red border-2 border-christmas-red hover:bg-christmas-red/10'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CardCategories; 