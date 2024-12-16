import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

const SnowEffect = () => {
  const snowRef = useRef(null);

  useEffect(() => {
    const createSnowflake = () => {
      const x = Math.random() * window.innerWidth;
      const startY = -600;
      const endY = window.innerHeight + 50;
      
      const swayAmount = 15 + Math.random() * 30;
      const swayDuration = 4000 + Math.random() * 2000;
      const fallDuration = 18000 + Math.random() * 8000;
      
      const size = 0.6 + Math.random() * 1;
      const opacity = 0.15 + Math.random() * 0.2;

      const snowflake = new mojs.Shape({
        parent: snowRef.current,
        shape: 'circle',
        fill: 'white',
        scale: { [size/10]: size/10 },
        opacity: { 
          [opacity]: opacity/3,
          easing: 'sine.inout'
        },
        y: { 
          [startY]: endY,
          easing: 'linear.none'
        },
        x: { 
          0: swayAmount,
          easing: 'sine.inout',
          duration: swayDuration,
          repeat: fallDuration/swayDuration
        },
        duration: fallDuration,
        left: x,
        onComplete() {
          snowflake.replay();
        }
      });

      snowflake.play();
    };

    const snowflakeCount = Math.floor((window.innerWidth * window.innerHeight) / 35000);
    
    for (let i = 0; i < snowflakeCount; i++) {
      setTimeout(createSnowflake, Math.random() * 8000);
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        createSnowflake();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={snowRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 50,
        background: 'transparent',
        overflow: 'hidden',
        top: '100px'
      }}
    />
  );
};

export default SnowEffect; 