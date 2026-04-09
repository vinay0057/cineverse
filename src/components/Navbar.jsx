import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      navigate('/search');
    }
  };

  return (
    <nav className="bg-black bg-opacity-95 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaFilm className="text-red-600 text-3xl" />
            <span className="text-white text-2xl font-bold">CineVerse</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link to="/trending" className="text-gray-300 hover:text-white transition">
              Trending
            </Link>
            <Link to="/top-rated" className="text-gray-300 hover:text-white transition">
              Top Rated
            </Link>
            <Link to="/popular" className="text-gray-300 hover:text-white transition">
              Popular
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 w-48 md:w-64"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;