import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

const BurstEffect = ({ children }) => {
  const burstRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!burstRef.current) {
      burstRef.current = new mojs.Burst({
        left: 0,
        top: 0,
        radius: { 0: 100 },
        count: 12,
        children: {
          shape: 'polygon',
          radius: 20,
          angle: { 360: 0 },
          fill: ['#D42F2F', '#FFD700', '#0F5132'],
          duration: 1300,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      });
    }
  }, []);

  const handleClick = (e) => {
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    
    burstRef.current
      .tune({ x, y })
      .replay();
  };

  return (
    <div ref={elementRef} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default BurstEffect; 