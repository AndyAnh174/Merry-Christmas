import React, { useState, useRef, useCallback } from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import frame1 from '../assets/frame/pngtree-vietnam-flag-photo-frame-vector-png-image_13857646.png';

const frames = [
  {
    id: 1,
    name: 'Khung Giáng Sinh 1',
    path: frame1,
  },
];

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  canvas.width = maxSize;
  canvas.height = maxSize;

  ctx.translate(maxSize / 2, maxSize / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-maxSize / 2, -maxSize / 2);

  ctx.drawImage(
    image,
    maxSize / 2 - image.width / 2,
    maxSize / 2 - image.height / 2
  );

  const data = ctx.getImageData(0, 0, maxSize, maxSize);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    0,
    0,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/png');
  });
};

const FramePage = () => {
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const [showFrame, setShowFrame] = useState(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Vui lòng chọn file ảnh hợp lệ (jpg, png, gif)');
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDownload = async () => {
    try {
      if (!croppedAreaPixels || !uploadedImage) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 800;
      canvas.width = size;
      canvas.height = size;

      const croppedImage = await getCroppedImg(
        uploadedImage,
        croppedAreaPixels,
        rotation
      );
      const image = await createImage(croppedImage);
      ctx.drawImage(image, 0, 0, size, size);

      if (showFrame) {
        const frameImage = await createImage(selectedFrame.path);
        ctx.drawImage(frameImage, 0, 0, size, size);
      }

      const link = document.createElement('a');
      link.download = 'christmas-frame.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Lỗi khi tải ảnh:', error);
      alert('Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-christmas text-christmas-red text-center mb-12">
          Frame Giáng Sinh
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
            <div 
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden" 
              style={{ height: '500px' }}
            >
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  <Cropper
                    image={uploadedImage}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    objectFit="contain"
                  />
                  {showFrame && (
                    <img
                      src={selectedFrame.path}
                      alt="Frame"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none frame-overlay"
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-primary font-christmas text-xl gap-2 mb-4"
                  >
                    <FaUpload /> Tải ảnh lên
                  </button>
                  <p className="text-gray-500">
                    Chọn ảnh có kích thước tối thiểu 200x200 pixels
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="font-christmas text-2xl text-christmas-red block mb-4">
                  Tải ảnh lên
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary w-full font-christmas text-xl gap-2"
                >
                  <FaUpload /> Chọn ảnh
                </button>
              </div>

              {/* Image Controls */}
              {uploadedImage && (
                <div className="space-y-4">
                  <div>
                    <label className="font-christmas text-xl text-christmas-red block mb-2">
                      Thu phóng: {Math.round(zoom * 100)}%
                    </label>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="range range-primary w-full"
                    />
                  </div>
                  <div>
                    <label className="font-christmas text-xl text-christmas-red block mb-2">
                      Xoay: {rotation}°
                    </label>
                    <input
                      type="range"
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="range range-primary w-full"
                    />
                  </div>
                  <div>
                    <label className="font-christmas text-xl text-christmas-red block mb-2">
                      Hiển thị khung
                    </label>
                    <input
                      type="checkbox"
                      checked={showFrame}
                      onChange={(e) => setShowFrame(e.target.checked)}
                      className="toggle toggle-primary"
                    />
                  </div>
                </div>
              )}

              {/* Frame Selection */}
              {showFrame && (
                <div>
                  <label className="font-christmas text-2xl text-christmas-red block mb-4">
                    Chọn khung
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {frames.map((frame) => (
                      <div
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                          selectedFrame.id === frame.id
                            ? 'border-christmas-red scale-105'
                            : 'border-transparent hover:border-christmas-red/50'
                        }`}
                      >
                        <img
                          src={frame.path}
                          alt={frame.name}
                          className="w-full aspect-square object-contain bg-gray-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Button */}
              {uploadedImage && (
                <button
                  onClick={handleDownload}
                  className="btn btn-primary w-full font-christmas text-xl gap-2"
                >
                  <FaDownload /> Tải về
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FramePage; 