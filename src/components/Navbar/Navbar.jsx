import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-gradient-to-r from-christmas-red to-christmas-green text-white shadow-lg">
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-christmas-red rounded-box w-52">
            <li><Link to="/" className="font-christmas text-xl">Trang chủ</Link></li>
            <li><Link to="/cards" className="font-christmas text-xl">Thiệp</Link></li>
            <li><Link to="/frames" className="font-christmas text-xl">Frame</Link></li>
            <li><Link to="/history" className="font-christmas text-xl">Lịch sử</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="navbar-center flex-1 justify-center">
        <Link to="/" className="btn btn-ghost normal-case text-3xl font-christmas mr-8">🎄 Christmas</Link>
        <ul className="hidden lg:flex menu menu-horizontal gap-8">
          <li><Link to="/" className="font-christmas text-2xl hover:text-christmas-gold transition-colors">Trang chủ</Link></li>
          <li><Link to="/cards" className="font-christmas text-2xl hover:text-christmas-gold transition-colors">Thiệp</Link></li>
          <li><Link to="/frames" className="font-christmas text-2xl hover:text-christmas-gold transition-colors">Frame</Link></li>
          <li><Link to="/history" className="font-christmas text-2xl hover:text-christmas-gold transition-colors">Lịch sử</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar; 