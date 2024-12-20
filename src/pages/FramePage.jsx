import React, { useState, useRef } from 'react';
import { FaUpload, FaDownload, FaUndo, FaEye, FaEyeSlash } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import frame1 from '../assets/frame/dsc1.png'
import frame2 from '../assets/frame/dsc2.png'
import frame3 from '../assets/frame/dsc3.png'
import frame13 from '../assets/frame/dsc4.png'
import frame4 from '../assets/frame/1.png';
import frame5 from '../assets/frame/2.png';
import frame6 from '../assets/frame/3.png';
import frame7 from '../assets/frame/4.png';
import frame8 from '../assets/frame/5.png';
import frame9 from '../assets/frame/6.png';
import frame10 from '../assets/frame/7.png';
import frame11 from '../assets/frame/8.png';
import frame12 from '../assets/frame/9.png';
import frame14 from '../assets/frame/dsc5.png';
import * as htmlToImage from 'html-to-image';

const frames = [frame1, frame2, frame3, frame13, frame14, frame4, frame5, frame6, frame7, frame8, frame9, frame10, frame11, frame12];

const FramePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [showFrame, setShowFrame] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const frameRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (frameRef.current) {
      setIsCapturing(true);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        const dataUrl = await htmlToImage.toPng(frameRef.current);
        const link = document.createElement('a');
        link.download = 'christmas-frame.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Lỗi khi tải ảnh:', err);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-christmas text-christmas-red text-center mb-10 drop-shadow-glow">
          Khung ảnh Giáng sinh
        </h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-4 md:p-8">
            <div 
              ref={frameRef}
              className="relative aspect-square w-full max-w-2xl mx-auto rounded-lg overflow-hidden"
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0">
                    <Cropper
                      image={selectedImage}
                      crop={crop}
                      zoom={zoom}
                      rotation={rotation}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onRotationChange={setRotation}
                      showGrid={false}
                      style={{
                        containerStyle: {
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'transparent',
                        },
                        cropAreaStyle: {
                          border: 'none',
                          background: 'transparent',
                          boxShadow: 'none',
                          outline: 'none'
                        },
                        mediaStyle: {
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        },
                      }}
                    />
                  </div>
                  {showFrame && (
                    <img
                      src={selectedFrame}
                      alt="Frame"
                      className="absolute inset-0 w-full h-full object-contain z-10 frame-overlay pointer-events-none"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500 text-center px-4">
                    Tải ảnh lên để bắt đầu
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
            {/* Upload Button */}
            <div>
              <label className="btn btn-primary w-full gap-2 font-christmas text-xl">
                <FaUpload /> Tải ảnh lên
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {selectedImage && (
              <>
                {/* Frame Selection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-christmas text-2xl text-red-500 drop-shadow">
                      Chọn khung
                    </h3>
                    <button
                      onClick={() => setShowFrame(!showFrame)}
                      className="btn btn-ghost btn-sm gap-2 text-red-500 hover:text-red-600"
                    >
                      {showFrame ? <FaEyeSlash /> : <FaEye />}
                      {showFrame ? 'Ẩn khung' : 'Hiện khung'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {frames.map((frame, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFrame(frame)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          selectedFrame === frame
                            ? 'border-christmas-red bg-christmas-red/10'
                            : 'border-gray-200 hover:border-christmas-red/50'
                        }`}
                      >
                        <img src={frame} alt={`Frame ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Controls */}
                <div className="space-y-4">
                  <h3 className="font-christmas text-2xl text-red-500 drop-shadow">
                    Điều chỉnh ảnh
                  </h3>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phóng to: {zoom.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gray-200"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xoay: {rotation}°
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gray-200"
                    />
                  </div>

                  <button
                    onClick={handleReset}
                    className="btn btn-outline w-full gap-2 font-christmas text-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <FaUndo /> Đặt lại
                  </button>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="btn w-full gap-2 font-christmas text-xl bg-gradient-to-r from-red-500 to-green-600 text-white hover:from-red-600 hover:to-green-700"
                >
                  <FaDownload /> Tải về
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FramePage; 