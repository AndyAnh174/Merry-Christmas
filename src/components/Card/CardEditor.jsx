import React, { useState, useRef } from 'react';
import { FaDownload, FaShare, FaFacebook } from 'react-icons/fa';
import * as htmlToImage from 'html-to-image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BurstEffect from '../Effects/BurstEffect';
import { updateOGTags } from '../../api/ogTags';

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

  // Thêm hàm để tạo và lưu ảnh
  const generateCardImage = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        // Cập nhật OG image meta tag
        document.getElementById('og-image').setAttribute('content', dataUrl);
        return dataUrl;
      } catch (error) {
        console.error('Lỗi khi tạo ảnh:', error);
        return null;
      }
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateCardImage();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'christmas-card.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShareFacebook = async () => {
    if (cardRef.current) {
      try {
        // Tạo và lưu ảnh vào OG meta tag
        await generateCardImage();

        // Lấy thông tin thiệp hiện tại
        const cardId = card.id; // ID của thiệp đang được edit
        const cardImage = card.thumbnail; // URL hình ảnh của thiệp

        // Tạo URL share với tham số
        const shareUrl = `https://merry-christmas-snowy.vercel.app/share?card=${encodeURIComponent(cardId)}&image=${encodeURIComponent(cardImage)}&text=${encodeURIComponent(customText)}&font=${encodeURIComponent(selectedFont)}&color=${encodeURIComponent(textColor)}&size=${encodeURIComponent(fontSize)}`;

        // Share lên Facebook với quote
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent('Thiệp Giáng sinh của tôi 🎄')}`;
        
        // Mở popup share Facebook
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(
          fbShareUrl,
          'facebook-share-dialog',
          `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        );

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
            <div className="grid grid-cols-2 gap-4 mb-4">
              {fonts.map(font => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedFont === font.id
                      ? 'border-christmas-red bg-christmas-red/10'
                      : 'border-gray-200 hover:border-christmas-red/50'
                  }`}
                  style={{ fontFamily: font.family }}
                >
                  <span className="text-xl">Aa</span>
                  <p className="text-sm mt-1">{font.name}</p>
                </button>
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
            <BurstEffect>
              <button
                onClick={handleDownload}
                className="btn btn-primary font-christmas text-xl gap-2"
              >
                <FaDownload /> Tải về
              </button>
            </BurstEffect>
            <BurstEffect>
              <button
                onClick={handleShareFacebook}
                className="btn bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-christmas text-xl gap-2"
              >
                <FaFacebook /> Chia sẻ Facebook
              </button>
            </BurstEffect>
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