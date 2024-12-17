import React, { useState, useRef } from 'react';
import { FaDownload, FaUndo } from 'react-icons/fa';
import * as htmlToImage from 'html-to-image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Draggable from 'react-draggable';

const CardEditor = ({ card, onBack }) => {
  const [customText, setCustomText] = useState('<p>Chúc mừng Giáng sinh!</p>');
  const [selectedFont, setSelectedFont] = useState('font-dancing');
  const [textColor, setTextColor] = useState('#D42F2F');
  const [fontSize, setFontSize] = useState('40');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [textWidth, setTextWidth] = useState(300);
  
  const fonts = [
    { 
      id: 'font-dancing', 
      name: 'Dancing Script', 
      family: "'Dancing Script', cursive",
      sample: 'Chúc mừng Giáng sinh!' 
    },
    { 
      id: 'font-great-vibes', 
      name: 'Great Vibes', 
      family: "'Great Vibes', cursive",
      sample: 'Merry Christmas!' 
    },
    { 
      id: 'font-pacifico', 
      name: 'Pacifico', 
      family: "'Pacifico', cursive",
      sample: 'Happy New Year!' 
    },
    { 
      id: 'font-lobster', 
      name: 'Lobster', 
      family: "'Lobster', cursive",
      sample: 'Season Greetings!' 
    },
    { 
      id: 'font-mountains', 
      name: 'Mountains of Christmas', 
      family: "'Mountains of Christmas', cursive",
      sample: 'Ho Ho Ho!' 
    },
    { 
      id: 'font-berkshire', 
      name: 'Berkshire Swash', 
      family: "'Berkshire Swash', cursive",
      sample: 'Jingle Bells!' 
    },
    { 
      id: 'font-courgette', 
      name: 'Courgette', 
      family: "'Courgette', cursive",
      sample: 'Happy Holidays!' 
    },
    { 
      id: 'font-satisfy', 
      name: 'Satisfy', 
      family: "'Satisfy', cursive",
      sample: 'Peace & Joy!' 
    }
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
      setIsCapturing(true);
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        const link = document.createElement('a');
        link.download = 'christmas-card.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
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
          <Draggable
            position={position}
            onDrag={handleDrag}
            disabled={isCapturing}
            bounds="parent"
          >
            <div 
              className={`absolute p-8 cursor-move ${isCapturing ? '' : 'hover:outline hover:outline-dashed hover:outline-2 hover:outline-blue-400'}`}
              style={{
                fontFamily: fonts.find(f => f.id === selectedFont)?.family || 'inherit',
                color: textColor,
                fontSize: `${fontSize}px`,
                left: '50%',
                top: '50%',
                transform: position.x === 0 && position.y === 0 ? 'translate(-50%, -50%)' : 'none',
                width: `${textWidth}px`,
                maxWidth: '90%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'visible'
              }}
            >
              <div 
                className="quill-content"
                dangerouslySetInnerHTML={{ __html: customText }}
              />
            </div>
          </Draggable>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
        {/* Text Editor */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Nội dung
          </h3>
          <div className="text-black">
            <ReactQuill
              value={customText}
              onChange={setCustomText}
              modules={modules}
              formats={formats}
              theme="snow"
              style={{ 
                color: 'black',
                '& .ql-editor': {
                  color: 'black'
                }
              }}
            />
          </div>
        </div>

        {/* Position Reset Button */}
        <div>
          <button
            onClick={() => setPosition({ x: 0, y: 0 })}
            className="btn btn-outline w-full gap-2 text-red-500 hover:bg-red-50"
          >
            Đặt lại vị trí chữ
          </button>
        </div>

        {/* Font Selection */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Phông chữ
          </h3>
          <div className="space-y-4">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedFont === font.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-200'
                }`}
                style={{ fontFamily: font.family }}
              >
                <div className="text-xl">{font.sample}</div>
                <div className="text-sm text-gray-500 mt-1">{font.name}</div>
              </button>
            ))}
          </div>
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
            min="5"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full"
          />
          <div className="text-center mt-2">{fontSize}px</div>
        </div>

        {/* Độ rộng khung chữ */}
        <div>
          <h3 className="font-christmas text-2xl text-red-500 drop-shadow mb-4">
            Độ rộng khung chữ
          </h3>
          <input
            type="range"
            min="100"
            max="800"
            value={textWidth}
            onChange={(e) => setTextWidth(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">{textWidth}px</div>
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