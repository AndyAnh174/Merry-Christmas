import React, { useState, useRef } from 'react';
import { FaDownload, FaUndo } from 'react-icons/fa';
import * as htmlToImage from 'html-to-image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BurstEffect from '../Effects/BurstEffect';

const CardEditor = ({ card, onBack }) => {
  const [customText, setCustomText] = useState('<p>Chúc mừng Giáng sinh!</p>');
  const [selectedFont, setSelectedFont] = useState('font-dancing');
  const [textColor, setTextColor] = useState('#D42F2F');
  const [fontSize, setFontSize] = useState('40');
  const cardRef = useRef(null);
  
  const fonts = [
    { id: 'font-dancing', name: 'Dancing Script', family: "'Dancing Script', cursive" },
    { id: 'font-great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive" },
    { id: 'font-pacifico', name: 'Pacifico', family: "'Pacifico', cursive" },
    { id: 'font-lobster', name: 'Lobster', family: "'Lobster', cursive" },
    { id: 'font-sans', name: 'Nunito', family: "'Nunito', sans-serif" },
    { id: 'font-serif', name: 'Serif', family: "serif" },
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
      <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
        {/* Text Editor */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Nội dung
          </h3>
          <ReactQuill
            value={customText}
            onChange={setCustomText}
            modules={modules}
            formats={formats}
          />
        </div>

        {/* Font Selection */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Phông chữ
          </h3>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="select select-bordered w-full"
          >
            {fonts.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Màu chữ
          </h3>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-12 cursor-pointer rounded-lg"
          />
        </div>

        {/* Font Size */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Cỡ chữ
          </h3>
          <input
            type="range"
            min="20"
            max="60"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full"
          />
          <div className="text-center mt-2">{fontSize}px</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDownload}
            className="btn w-full gap-2 font-christmas text-xl bg-gradient-to-r from-red-500 to-green-600 text-white hover:from-red-600 hover:to-green-700"
          >
            <FaDownload /> Tải về
          </button>
          <button
            onClick={onBack}
            className="btn btn-outline w-full gap-2 font-christmas text-xl text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <FaUndo /> Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEditor; 