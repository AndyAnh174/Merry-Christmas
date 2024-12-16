import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = ({ onStart }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-christmas-red to-christmas-green z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-christmas text-white mb-8">
          🎄 Merry Christmas 🎄
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="btn btn-lg bg-white text-christmas-red font-christmas text-2xl hover:bg-christmas-gold"
        >
          Bắt đầu
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LoadingPage; 