import React, { useState } from 'react';
import CardList from '../components/Card/CardList';
import CardEditor from '../components/Card/CardEditor';
import CardCategories from '../components/Card/CardCategories';

const CardPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'family', name: 'Gia đình' },
    { id: 'friend', name: 'Bạn bè' },
    { id: 'love', name: 'Tình yêu' },
    { id: 'business', name: 'Công việc' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-christmas text-christmas-red text-center mb-12">
          Thiệp Giáng Sinh
        </h1>
        
        {!selectedCard ? (
          <>
            <CardCategories 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <CardList 
              selectedCategory={selectedCategory}
              onSelectCard={setSelectedCard}
            />
          </>
        ) : (
          <CardEditor 
            card={selectedCard}
            onBack={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CardPage; 