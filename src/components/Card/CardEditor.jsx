import React, { useState, useRef } from 'react';
import { FaDownload, FaShare, FaFacebook } from 'react-icons/fa';
import * as htmlToImage from 'html-to-image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CardEditor = ({ card, onBack }) => {
  const [customText, setCustomText] = useState('<p>Chúc mừng Giáng sinh!</p>');
  const [selectedFont, setSelectedFont] = useState('font-christmas');
  const [textColor, setTextColor] = useState('#D42F2F');
  const [fontSize, setFontSize] = useState('40');
  const cardRef = useRef(null);
  
  const fonts = [
    { 
      id: 'font-christmas', 
      name: 'Dancing Script', 
      family: "'Dancing Script', cursive",
      preview: 'Merry Christmas'
    },
    { 
      id: 'font-greatVibes', 
      name: 'Great Vibes', 
      family: "'Great Vibes', cursive",
      preview: 'Merry Christmas'
    },
    { 
      id: 'font-pacifico', 
      name: 'Pacifico', 
      family: "'Pacifico', cursive",
      preview: 'Merry Christmas'
    },
    { 
      id: 'font-lobster', 
      name: 'Lobster', 
      family: "'Lobster', cursive",
      preview: 'Merry Christmas'
    },
    { 
      id: 'font-sans', 
      name: 'Nunito', 
      family: "'Nunito', sans-serif",
      preview: 'Merry Christmas'
    },
    { 
      id: 'font-serif', 
      name: 'Serif', 
      family: "serif",
      preview: 'Merry Christmas'
    },
  ];

  // Cấu hình cho React-Quill
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'bullet'
  ];

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

  const handleShareFacebook = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
      } catch (error) {
        console.error('Lỗi khi chia sẻ:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Preview Panel */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
        <div 
          ref={cardRef}
          className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            src={card.thumbnail}
            alt="Card Preview"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{
              fontFamily: fonts.find(f => f.id === selectedFont)?.family || 'inherit',
              color: textColor,
              fontSize: `${fontSize}px`,
            }}
          >
            <div 
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: customText }}
            />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="font-christmas text-2xl text-christmas-red block mb-2">
              Lời chúc
            </label>
            <div className="bg-white">
              <ReactQuill
                value={customText}
                onChange={setCustomText}
                modules={modules}
                formats={formats}
                className="rounded-lg border"
              />
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <label className="font-christmas text-2xl text-christmas-red block mb-2">
              Font chữ
            </label>
            <div className="grid grid-cols-1 gap-2">
              {fonts.map(font => (
                <div
                  key={font.id}
                  onClick={() => setSelectedFont(font.id)}
                  className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                    selectedFont === font.id
                      ? 'border-christmas-red bg-christmas-red/5'
                      : 'border-gray-200 hover:border-christmas-red/50'
                  }`}
                >
                  <div
                    className="text-xl"
                    style={{ fontFamily: font.family }}
                  >
                    {font.preview}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {font.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="font-christmas text-2xl text-christmas-red block mb-2">
              Màu chữ
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-12 rounded-lg"
            />
          </div>

          {/* Font Size */}
          <div>
            <label className="font-christmas text-2xl text-christmas-red block mb-2">
              Cỡ chữ: {fontSize}px
            </label>
            <input
              type="range"
              min="20"
              max="80"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleDownload}
              className="btn btn-primary font-christmas text-xl gap-2"
            >
              <FaDownload /> Tải về
            </button>
            <button
              onClick={handleShareFacebook}
              className="btn bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-christmas text-xl gap-2"
            >
              <FaFacebook /> Chia sẻ Facebook
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full btn btn-outline font-christmas text-xl"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEditor; 