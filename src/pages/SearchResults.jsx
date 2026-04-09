import React, { useEffect, useState } from 'react';
import { tmdbApi, endpoints } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const SearchResults = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery) return;
      
      try {
        setLoading(true);
        const response = await tmdbApi.get(endpoints.search, {
          params: { query: searchQuery },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [searchQuery]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#141414] min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Search for movies'}
        </h1>
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default SearchResults;