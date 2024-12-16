import React from 'react';
import ReactCountdown from 'react-countdown';
import BurstEffect from '../Effects/BurstEffect';

const Countdown = () => {
  const christmasDate = new Date('2024-12-25T00:00:00');

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
      <BurstEffect>
        <div className="flex flex-col items-center p-8 bg-christmas-red/10 rounded-lg shadow-xl">
          <span className="countdown font-christmas text-7xl text-christmas-red">{days}</span>
          <span className="text-2xl mt-3 font-christmas">Ngày</span>
        </div>
      </BurstEffect>
      <BurstEffect>
        <div className="flex flex-col items-center p-8 bg-christmas-green/10 rounded-lg shadow-xl">
          <span className="countdown font-christmas text-7xl text-christmas-green">{hours}</span>
          <span className="text-2xl mt-3 font-christmas">Giờ</span>
        </div>
      </BurstEffect>
      <BurstEffect>
        <div className="flex flex-col items-center p-8 bg-christmas-red/10 rounded-lg shadow-xl">
          <span className="countdown font-christmas text-7xl text-christmas-red">{minutes}</span>
          <span className="text-2xl mt-3 font-christmas">Phút</span>
        </div>
      </BurstEffect>
      <BurstEffect>
        <div className="flex flex-col items-center p-8 bg-christmas-green/10 rounded-lg shadow-xl">
          <span className="countdown font-christmas text-7xl text-christmas-green">{seconds}</span>
          <span className="text-2xl mt-3 font-christmas">Giây</span>
        </div>
      </BurstEffect>
    </div>
  );

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
      <BurstEffect>
        <h2 className="text-5xl font-christmas text-center text-christmas-red mb-16">
          Đếm ngược đến Giáng sinh
        </h2>
      </BurstEffect>
      <ReactCountdown date={christmasDate} renderer={renderer} />
    </div>
  );
};

export default Countdown; 