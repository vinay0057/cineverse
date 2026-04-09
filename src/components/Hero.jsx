import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/tmdb';
import { FaStar, FaPlay, FaInfoCircle } from 'react-icons/fa';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[80vh] mb-8">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400 text-xl" />
              <span className="text-white text-xl font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-300 text-lg">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>

          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex space-x-4">
            <Link
              to={`/movie/${movie.id}`}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition"
            >
              <FaPlay />
              <span>Play</span>
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="bg-gray-700 bg-opacity-70 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-600 transition"
            >
              <FaInfoCircle />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;