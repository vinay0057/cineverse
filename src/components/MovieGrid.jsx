import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, title }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        <p className="text-xl">No movies found</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-white text-3xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;