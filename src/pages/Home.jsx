import React, { useEffect, useState } from 'react';
import { tmdbApi, endpoints } from '../api/tmdb';
import Hero from '../components/Hero';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingRes, topRatedRes, popularRes] = await Promise.all([
          tmdbApi.get(endpoints.trending),
          tmdbApi.get(endpoints.topRated),
          tmdbApi.get(endpoints.popular),
        ]);

        setTrending(trendingRes.data.results.slice(0, 10));
        setTopRated(topRatedRes.data.results.slice(0, 10));
        setPopular(popularRes.data.results.slice(0, 10));
        setHeroMovie(trendingRes.data.results[0]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#141414] min-h-screen">
      <Hero movie={heroMovie} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <MovieGrid movies={trending} title="Trending Now" />
        <MovieGrid movies={topRated} title="Top Rated" />
        <MovieGrid movies={popular} title="Popular on CineVerse" />
      </div>
    </div>
  );
};

export default Home;