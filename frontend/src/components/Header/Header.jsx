import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSelector from "../LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      //Translate
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875V20.25C1.5 21.285 2.339 22.125 3.375 22.125H20.625C21.661 22.125 22.5 21.285 22.5 20.25V4.875C22.5 3.84 21.661 3 20.625 3H3.375zM9 14.25H6.75v1.5H9v-1.5zm0-3H6.75v1.5H9v-1.5zM9 8.25H6.75v1.5H9v-1.5zm9.75 6H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5zm0-3H15v1.5h3.75v-1.5z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">Bachat</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/stock" className="text-sm text-gray-300 hover:text-green-400 transition-all">
            STOCKS
          </NavLink>
          <NavLink to="/insurance" className="text-sm text-gray-300 hover:text-green-400 transition-all">
            INSURANCE
          </NavLink>
          <NavLink to="/profile" className="text-sm text-gray-300 hover:text-green-400 transition-all">
            PROFILE
          </NavLink>
          <NavLink to="/prediction" className="text-sm text-gray-300 hover:text-green-400 transition-all">
            PREDICT STOCKS
          </NavLink>
        </nav>

        {/* Right side: Login, Signup, Language Selector */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-green-500 transition-all">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all">
              Sign Up
            </button>
          </Link>
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md text-white hover:bg-gray-800 transition"
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 text-white py-4 px-6 absolute top-16 left-0 w-full shadow-lg">
          <NavLink to="/stock" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
            STOCKS
          </NavLink>
          <NavLink to="/insurance" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
            INSURANCE
          </NavLink>
          <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
            PROFILE
          </NavLink>
          <NavLink to="/prediction" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm hover:text-green-400">
            PREDICT STOCKS
          </NavLink>
          <div className="mt-4">
            <LanguageSelector />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
