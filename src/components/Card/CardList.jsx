import React from 'react';

const cards = [
  {
    id: 1,
    title: 'Thiệp Cổ Điển',
    category: 'family',
    thumbnail: 'https://placehold.co/600x400/red/white?text=Classic+Card',
    template: 'classic',
  },
  {
    id: 2,
    title: 'Thiệp Hiện Đại',
    category: 'friend',
    thumbnail: 'https://placehold.co/600x400/green/white?text=Modern+Card',
    template: 'modern',
  },
  // Thêm các mẫu thiệp khác...
];

const CardList = ({ selectedCategory, onSelectCard }) => {
  const filteredCards = selectedCategory === 'all'
    ? cards
    : cards.filter(card => card.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredCards.map((card) => (
        <div
          key={card.id}
          className="card bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group"
          onClick={() => onSelectCard(card)}
        >
          <figure className="relative pt-[75%]">
            <img
              src={card.thumbnail}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-christmas text-2xl text-christmas-red">
              {card.title}
            </h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary font-christmas">
                Tùy chỉnh
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList; 