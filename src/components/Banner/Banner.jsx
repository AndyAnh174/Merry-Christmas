import React from 'react';
import BurstEffect from '../Effects/BurstEffect';
import banner from '../../assets/banner/1.png';

const greetings = [
  "Chúc mừng Giáng sinh an lành!",
  "Merry Christmas!",
  "Feliz Navidad!"
];

const Banner = () => {
  const [currentGreeting, setCurrentGreeting] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="carousel w-full h-full">
        <div className="carousel-item relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/50 to-christmas-green/50" />
          <img 
            src={banner} 
            className="w-full h-full object-cover" 
            alt="Christmas Banner"
          />
          <div className="absolute flex flex-col items-center justify-center inset-0 bg-black bg-opacity-30">
            <BurstEffect>
              <h1 className="text-6xl md:text-8xl text-white font-christmas font-bold mb-6">
                {greetings[currentGreeting]}
              </h1>
            </BurstEffect>
            <p className="text-2xl md:text-4xl text-christmas-gold font-christmas">
              Mùa của yêu thương và sẻ chia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner; 