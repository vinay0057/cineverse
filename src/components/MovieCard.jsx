import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/tmdb';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-white text-sm">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300 text-sm">
                {movie.release_date?.split('-')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded flex items-center space-x-1">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-white text-xs font-semibold">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;