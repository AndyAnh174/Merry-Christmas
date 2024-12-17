import React from 'react';
import thiep1 from '../../assets/card/1.png';
import thiep2 from '../../assets/card/2.png';
import cv1 from '../../assets/card/cv1.png';
import cv2 from '../../assets/card/cv2.png';
import cv3 from '../../assets/card/cv3.png';
import family1 from '../../assets/card/family1.png';
import family2 from '../../assets/card/family2.png';
import family3 from '../../assets/card/family3.png';
import friends1 from '../../assets/card/friends1.png';
import friends2 from '../../assets/card/friends2.png';
import love1 from '../../assets/card/love1.png';
import love2 from '../../assets/card/love2.png';
import love3 from '../../assets/card/love3.png';



const cards = [
  {
    id: 1,
    title: 'Thiệp Gia đình',
    category: 'family',
    thumbnail: thiep1,
    template: 'classic',
  },
  {
    id: 2,
    title: 'Thiệp Bạn bè',
    category: 'friend',
    thumbnail: thiep2,
    template: 'modern',
  },
  {
    id: 3,
    title: 'Thiệp Công ty',
    category: 'business',
    thumbnail: cv1,
    template: 'business',
  },
  {
    id: 4,
    title: 'Thiệp Công ty',
    category: 'business',
    thumbnail: cv2,
    template: 'business',
  },
  {
    id: 5,
    title: 'Thiệp Công ty',
    category: 'business',
    thumbnail: cv3,
    template: 'business',
  },
  {
    id: 6,
    title: 'Thiệp Gia đình',
    category: 'family',
    thumbnail: family1,
    template: 'family',
  },
  {
    id: 7,
    title: 'Thiệp Gia đình',
    category: 'family',
    thumbnail: family2,
    template: 'family',
  },
  {
    id: 8,
    title: 'Thiệp Gia đình',
    category: 'family',
    thumbnail: family3,
    template: 'family',
  },
  {
    id: 9,
    title: 'Thiệp Bạn bè',
    category: 'friend',
    thumbnail: friends1,
    template: 'friend',
  },
  {
    id: 10,
    title: 'Thiệp Bạn bè',
    category: 'friend',
    thumbnail: friends2,
    template: 'friend',
  },
  {
    id: 11,
    title: 'Thiệp Tình yêu',
    category: 'love',
    thumbnail: love1,
    template: 'love',
  },
  {
    id: 12,
    title: 'Thiệp Tình yêu',
    category: 'love',
    thumbnail: love3,
    template: 'love',
  },
  {
    id: 13,
    title: 'Thiệp Tình yêu',
    category: 'love',
    thumbnail: love2,
    template: 'love',
  },
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