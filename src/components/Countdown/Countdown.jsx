import React, { useState, useEffect, useRef } from 'react';
import ReactCountdown from 'react-countdown';
import BurstEffect from '../Effects/BurstEffect';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Countdown = () => {
  const christmasDate = new Date('2024-12-17T00:00:00');
  const [showCongrats, setShowCongrats] = useState(false);
  const hasShownCongrats = useRef(false);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed && !showCongrats && !hasShownCongrats.current) {
      hasShownCongrats.current = true;
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
      }, 12000);
    }

    if (showCongrats) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Overlay tối */}
          <div className="absolute inset-0 bg-black/70">
            {/* Hiệu ứng tuyết rơi */}
            <div className="snowfall-christmas"></div>
          </div>
          
          {/* Chữ chúc mừng */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-christmas text-christmas-red text-center drop-shadow-glow animate-pulse mb-8">
              Chúc Mừng Giáng Sinh
            </h1>
            
            <div className="text-3xl md:text-4xl text-white font-christmas flex flex-col items-center space-y-4">
              <Typewriter
                options={{
                  strings: [''],
                  autoStart: true,
                  loop: false,
                  delay: 100,
                  cursor: '_',
                  wrapperClassName: 'typewriter-text',
                  cursorClassName: 'typewriter-cursor'
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Chúc bạn hạnh phúc bên gia đình')
                    .pauseFor(500)
                    .typeString('<br/>')
                    .typeString('Một năm qua chắc vất vả lắm')
                    .start();
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        <BurstEffect>
          <div className="flex flex-col items-center p-8 bg-christmas-red/10 rounded-lg shadow-xl">
            <span className="countdown font-christmas text-7xl text-christmas-red">
              {completed ? '0' : days}
            </span>
            <span className="text-2xl mt-3 font-christmas">Ngày</span>
          </div>
        </BurstEffect>
        <BurstEffect>
          <div className="flex flex-col items-center p-8 bg-christmas-green/10 rounded-lg shadow-xl">
            <span className="countdown font-christmas text-7xl text-christmas-green">
              {completed ? '0' : hours}
            </span>
            <span className="text-2xl mt-3 font-christmas">Giờ</span>
          </div>
        </BurstEffect>
        <BurstEffect>
          <div className="flex flex-col items-center p-8 bg-christmas-red/10 rounded-lg shadow-xl">
            <span className="countdown font-christmas text-7xl text-christmas-red">
              {completed ? '0' : minutes}
            </span>
            <span className="text-2xl mt-3 font-christmas">Phút</span>
          </div>
        </BurstEffect>
        <BurstEffect>
          <div className="flex flex-col items-center p-8 bg-christmas-green/10 rounded-lg shadow-xl">
            <span className="countdown font-christmas text-7xl text-christmas-green">
              {completed ? '0' : seconds}
            </span>
            <span className="text-2xl mt-3 font-christmas">Giây</span>
          </div>
        </BurstEffect>
      </div>
    );
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
      <AnimatePresence>
        {!showCongrats && (
          <BurstEffect>
            <h2 className="text-5xl font-christmas text-center text-christmas-red mb-16">
              Đếm ngược đến Giáng sinh
            </h2>
          </BurstEffect>
        )}
        <ReactCountdown date={christmasDate} renderer={renderer} />
      </AnimatePresence>
    </div>
  );
};

export default Countdown; 