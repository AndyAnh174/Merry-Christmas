import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import * as htmlToImage from 'html-to-image';
import BurstEffect from '../components/Effects/BurstEffect';

const SharePage = () => {
  const [searchParams] = useSearchParams();
  const [cardData, setCardData] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Lấy thông tin thiệp từ URL parameters
    const cardId = searchParams.get('card');
    const cardImage = searchParams.get('image');
    const text = searchParams.get('text');
    const font = searchParams.get('font');
    const color = searchParams.get('color');
    const size = searchParams.get('size');

    // Tạo preview thiệp
    setCardData({
      id: cardId,
      image: cardImage,
      text,
      font,
      color,
      size
    });
  }, [searchParams]);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        const link = document.createElement('a');
        link.download = 'christmas-card.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
      }
    }
  };

  if (!cardData) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="max-w-2xl w-full">
        <div 
          ref={cardRef}
          className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-xl"
        >
          <img
            className="w-full h-full object-cover"
            src={cardData.image || `/cards/${cardData.id}.jpg`}
            alt="Christmas Card"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{
              fontFamily: cardData.font,
              color: cardData.color,
              fontSize: `${cardData.size}px`,
            }}
          >
            <div 
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: cardData.text }}
            />
          </div>
        </div>
      </div>

      {/* Nút tải về */}
      <BurstEffect>
        <button
          onClick={handleDownload}
          className="btn btn-primary font-christmas text-xl gap-2 bg-gradient-to-r from-christmas-red to-christmas-green text-white hover:opacity-90 transition-opacity"
        >
          <FaDownload /> Tải thiệp về
        </button>
      </BurstEffect>
    </div>
  );
};

export default SharePage; 