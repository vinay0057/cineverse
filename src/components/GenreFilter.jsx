import React, { useEffect, useState } from 'react';
import { tmdbApi, endpoints } from '../api/tmdb';

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.get(endpoints.genres);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-3 pb-2">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
            selectedGenre === null
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
              selectedGenre === genre.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;