import React, { useState, useEffect } from 'react';
import BurstEffect from '../Effects/BurstEffect';
import { motion, AnimatePresence } from 'framer-motion';
import banner1 from '../../assets/banner/1.png';
import banner2 from '../../assets/banner/2.png';
import banner3 from '../../assets/banner/3.png';
import banner4 from '../../assets/banner/4.png';

const banners = [banner1, banner2, banner3, banner4];

const greetings = [
  "Chúc mừng Giáng sinh an lành!",
  "Một năm mới vui vẻ!",
  "Merry Christmas!",
  "Feliz Navidad!",
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Banner = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < banners.length) {
      setPage([newPage, newDirection]);
      setCurrentBanner(newPage);
    }
  };

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 5000);

    const bannerInterval = setInterval(() => {
      paginate(1);
      if (page === banners.length - 1) {
        setPage([0, -1]);
        setCurrentBanner(0);
      }
    }, 5000);

    return () => {
      clearInterval(greetingInterval);
      clearInterval(bannerInterval);
    };
  }, [page]);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="carousel w-full h-full">
        <div className="carousel-item relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/50 to-christmas-green/50 z-10" />
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={banners[currentBanner]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full h-full object-cover absolute inset-0"
              alt="Christmas Banner"
            />
          </AnimatePresence>
          <div className="absolute flex flex-col items-center justify-center inset-0 z-20">
            <BurstEffect>
              <h1 className="text-6xl md:text-8xl text-white font-christmas font-bold">
                {greetings[currentGreeting]}
              </h1>
            </BurstEffect>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentBanner === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => {
              const direction = index > currentBanner ? 1 : -1;
              setPage([index, direction]);
              setCurrentBanner(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner; 