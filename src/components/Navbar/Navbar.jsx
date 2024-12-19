import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import logoDSC from '../../assets/logo-dsc.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-christmas-red to-christmas-green fixed w-full top-0 z-[100]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎄</span>
            <span className="text-white font-christmas text-2xl flex items-center gap-2">
              Christmas 2024
              <img 
                src={logoDSC} 
                alt="Christmas Logo" 
                className="w-auto h-24 object-contain"
              />
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                  isActive ? 'text-christmas-gold' : ''
                }`
              }
            >
              <span className="flex items-center gap-2">
                <span>🏠</span> Trang chủ
              </span>
            </NavLink>
            <NavLink
              to="/cards"
              className={({ isActive }) =>
                `text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                  isActive ? 'text-christmas-gold' : ''
                }`
              }
            >
              <span className="flex items-center gap-2">
                <span>💌</span> Thiệp
              </span>
            </NavLink>
            <NavLink
              to="/frames"
              className={({ isActive }) =>
                `text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                  isActive ? 'text-christmas-gold' : ''
                }`
              }
            >
              <span className="flex items-center gap-2">
                <span>🖼️</span> Khung ảnh
              </span>
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                  isActive ? 'text-christmas-gold' : ''
                }`
              }
            >
              <span className="flex items-center gap-2">
                <span>📜</span> Lịch sử
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-gradient-to-r from-christmas-red to-christmas-green fixed w-full left-0 top-16 z-[100]"
            >
              <div className="container mx-auto">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                        isActive ? 'text-christmas-gold' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span>🏠</span> Trang chủ
                    </span>
                  </NavLink>
                  <NavLink
                    to="/cards"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                        isActive ? 'text-christmas-gold' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span>💌</span> Thiệp
                    </span>
                  </NavLink>
                  <NavLink
                    to="/frames"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                        isActive ? 'text-christmas-gold' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span>🖼️</span> Khung ảnh
                    </span>
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      `block px-3 py-2 text-white font-christmas text-xl hover:text-christmas-gold transition-colors ${
                        isActive ? 'text-christmas-gold' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span>📜</span> Lịch sử
                    </span>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 