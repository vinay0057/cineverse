import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbApi, endpoints } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import Loading from '../components/Loading';

const CategoryPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryEndpoints = {
    trending: endpoints.trending,
    'top-rated': endpoints.topRated,
    popular: endpoints.popular,
  };

  const categoryTitles = {
    trending: 'Trending Movies',
    'top-rated': 'Top Rated Movies',
    popular: 'Popular Movies',
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        if (selectedGenre) {
          const response = await tmdbApi.get(endpoints.discover, {
            params: { with_genres: selectedGenre },
          });
          setMovies(response.data.results);
        } else {
          const endpoint = categoryEndpoints[category] || endpoints.popular;
          const response = await tmdbApi.get(endpoint);
          setMovies(response.data.results); 
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, selectedGenre]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#141414] min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-8">
          {categoryTitles[category] || 'Movies'}
        </h1>
        
        <GenreFilter 
          selectedGenre={selectedGenre} 
          onGenreChange={setSelectedGenre} 
        />
        
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default CategoryPage;